import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SavedRecipes } from './';

// --- MOCK DAS DEPENDÊNCIAS ---

// Mock dos componentes filhos para isolar o teste na lógica da página
vi.mock('../../components/Header', () => ({ Header: () => <header data-testid="header-mock" /> }));

vi.mock('../../components/HighLight', () => ({
  HighLight: ({ title }: { title: string }) => <article>{title}</article>,
}));

vi.mock('../../components/Button', () => ({
  Button: ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

// Mock do array de receitas.
// Definimos os dados diretamente dentro do mock para evitar erros de "hoisting".
vi.mock('../../mocks/savedRecipesMock', () => ({
  savedRecipesMock: [
    { id: '1', title: 'Bolo de Cenoura para Pets', saved: true, image: 'bolo.jpg' },
    { id: '2', title: 'Biscoito de Atum para Gatos', saved: true, image: 'biscoito.jpg' },
    { id: '3', title: 'Petisco de Maçã', saved: false, image: 'maca.jpg' },
  ],
}));

// --- SUÍTE DE TESTES ---
describe('Página: SavedRecipes', () => {

  it('deve renderizar apenas as receitas salvas ao carregar a página', () => {
    // ARRANGE
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    // ASSERT
    expect(screen.getByRole('heading', { name: /receitas salvas/i })).toBeInTheDocument();
    
    expect(screen.getByText('Bolo de Cenoura para Pets')).toBeInTheDocument();
    expect(screen.getByText('Biscoito de Atum para Gatos')).toBeInTheDocument();
    
    expect(screen.queryByText('Petisco de Maçã')).toBeNull();
  });

  it('deve remover uma receita da lista quando o botão "Remover" for clicado', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    const recipeCard1 = screen.getByText('Bolo de Cenoura para Pets').closest('.recipe-card');
    expect(recipeCard1).toBeInTheDocument();

    // Garante que o teste falhe de forma clara se o card não for encontrado
    if (!recipeCard1) throw new Error("Card da receita não encontrado");

    // AQUI ESTÁ A CORREÇÃO: Usamos 'as HTMLElement' para dizer ao TypeScript
    // que 'recipeCard1' é um elemento HTML específico.
    const removeButton = within(recipeCard1 as HTMLElement).getByRole('button', { name: /remover/i });

    // ACT
    await user.click(removeButton);

    // ASSERT
    expect(screen.queryByText('Bolo de Cenoura para Pets')).toBeNull();
    expect(screen.getByText('Biscoito de Atum para Gatos')).toBeInTheDocument();
  });

  it('deve exibir a mensagem de "nenhuma receita" quando todas forem removidas', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<SavedRecipes />, { wrapper: BrowserRouter });

    // ACT 1: Remove a primeira receita
    const recipeCard1 = screen.getByText('Bolo de Cenoura para Pets').closest('.recipe-card');
    if (!recipeCard1) throw new Error("Card 1 não encontrado");
    const removeButton1 = within(recipeCard1 as HTMLElement).getByRole('button', { name: /remover/i });
    await user.click(removeButton1);

    // ACT 2: Remove a segunda receita
    const recipeCard2 = screen.getByText('Biscoito de Atum para Gatos').closest('.recipe-card');
    if (!recipeCard2) throw new Error("Card 2 não encontrado");
    const removeButton2 = within(recipeCard2 as HTMLElement).getByRole('button', { name: /remover/i });
    await user.click(removeButton2);

    // ASSERT: Agora que a lista está vazia, a mensagem deve aparecer
    expect(screen.getByText('Você ainda não salvou nenhuma receita')).toBeInTheDocument();
  });
});