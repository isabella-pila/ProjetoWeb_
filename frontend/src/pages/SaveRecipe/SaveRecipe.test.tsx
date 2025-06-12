// Arquivo: src/pages/SavedRecipes/SavedRecipes.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SavedRecipes } from './';

// --- MOCKS ---

// Mock dos componentes filhos para isolar o teste na página SavedRecipes
vi.mock('../../components/Header', () => ({
  Header: () => <header>Header Mock</header>,
}));

vi.mock('../../components/HighLight', () => ({
  // O HighLight recebe 'title', então vamos garantir que ele o exiba
  // para que possamos encontrá-lo nos testes.
  HighLight: ({ title }: { title: string }) => <div>{title}</div>,
}));

// Mock do nosso componente de botão para garantir que o onClick funcione
vi.mock('../../components/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

// Mock do hook de autenticação, que é a dependência mais importante
const mockSetUserName = vi.fn();
vi.mock('../../hooks/userAuth', () => ({
  useAuth: () => ({
    currentUser: { name: 'Usuário Padrão' },
    setUserName: mockSetUserName,
  }),
}));

// Mock do array de receitas para ter dados consistentes
vi.mock('../../mocks/savedRecipesMock', () => ({
  savedRecipesMock: [
    { id: '1', title: 'Bolo de Cenoura Fofinho', saved: true, image: 'bolo.jpg' },
    { id: '2', title: 'Frango Grelhado com Limão', saved: true, image: 'frango.jpg' },
    { id: '3', title: 'Torta de Maçã', saved: false, image: 'torta.jpg' },
  ],
}));

// --- TESTES ---

describe('Página: SavedRecipes', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste para não haver interferência
    vi.clearAllMocks();
  });

  it('deve renderizar o nome do usuário e as receitas salvas corretamente', () => {
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    // Verifica o título da página
    expect(screen.getByRole('heading', { name: /receitas salvas/i })).toBeInTheDocument();

    // Procura pelo elemento <p> que contém a saudação completa.
    // Esta é a correção para o texto quebrado pela tag <strong>
    const greeting = screen.getByText((content, element) => {
      return element.textContent === 'Olá, Usuário Padrão!';
    });
    expect(greeting).toBeInTheDocument();

    // Verifica se as receitas marcadas como 'saved: true' no mock são renderizadas
    expect(screen.getByText('Bolo de Cenoura Fofinho')).toBeInTheDocument();
    expect(screen.getByText('Frango Grelhado com Limão')).toBeInTheDocument();

    // Verifica que a receita não salva não foi renderizada
    expect(screen.queryByText('Torta de Maçã')).not.toBeInTheDocument();
  });

  it('deve remover uma receita da lista ao clicar em "Remover"', async () => {
    const user = userEvent.setup();
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    // Garante que a receita existe antes de ser removida
    expect(screen.getByText('Bolo de Cenoura Fofinho')).toBeInTheDocument();

    // Encontra todos os botões de remover e clica no primeiro
    const removeButtons = screen.getAllByRole('button', { name: /remover/i });
    await user.click(removeButtons[0]);

    // Espera a UI atualizar e verifica se a receita foi removida da tela
    await waitFor(() => {
      expect(screen.queryByText('Bolo de Cenoura Fofinho')).not.toBeInTheDocument();
    });
  });

  it('deve permitir que o usuário edite e salve um novo nome', async () => {
    const user = userEvent.setup();
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    // 1. Clica no botão para entrar no modo de edição
    await user.click(screen.getByRole('button', { name: /editar nome/i }));

    // 2. Verifica se o campo de input apareceu
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    // 3. Limpa o campo e digita um novo nome
    await user.clear(input);
    await user.type(input, 'Novo Nome do Usuário');

    // 4. Clica em salvar
    await user.click(screen.getByRole('button', { name: /salvar/i }));

    // 5. Verifica se a função setUserName do hook foi chamada com o valor correto
    expect(mockSetUserName).toHaveBeenCalledWith('Novo Nome do Usuário');

    // 6. Verifica se a UI voltou ao modo de exibição (o input sumiu)
    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  it('deve exibir uma mensagem de estado vazio quando não houver receitas', async () => {
    const user = userEvent.setup();
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    // Remove todas as receitas da tela
    const removeButtons = screen.getAllByRole('button', { name: /remover/i });
    await user.click(removeButtons[0]);
    await user.click(removeButtons[1]);

    // Verifica se a mensagem de "nenhuma receita" é exibida
    expect(await screen.findByText(/você ainda não salvou nenhuma receita/i)).toBeInTheDocument();
  });
});