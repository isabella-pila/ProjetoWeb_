// src/pages/HomePage/HomePage.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './';

// --- MOCK DAS DEPENDÊNCIAS ---
// Mockamos todas as dependências externas para controlar o ambiente do teste.

// 1. Mock do hook de autenticação (usado pelo Header)
vi.mock('../../hooks/userAuth', () => ({
  useAuth: () => ({
    currentUser: null, // Simulando um usuário deslogado para simplificar
    logout: vi.fn(),
  }),
}));

// 2. Mock do array de receitas (usado pelo Emphasis)
const mockRecipes = [
  {
    id: 1,
    title: 'Muffin salgado para cães',
    category: 'cachorro',
    src: 'muffin-caes.jpg',
    href: 'receita1.html',
  },
  {
    id: 2,
    title: 'Biscoitinho saudável de atum',
    category: 'gato',
    src: 'biscoito-gato.jpg',
    href: 'receita2.html',
  },
];

vi.mock('../../data/recipesMock', () => ({
  recipes: mockRecipes,
}));

// 3. Mock dos componentes filhos do Emphasis para simplificar o teste
vi.mock('../../components/HighLight', () => ({
  HighLight: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock('../../components/HighlightVideo', () => ({
  HighlightVideo: () => <div>Vídeo em Destaque</div>,
}));

// --- SUÍTE DE TESTES DE INTEGRAÇÃO ---
describe('Página: HomePage', () => {

  it('deve filtrar o conteúdo do componente Emphasis quando o usuário digita no Header', async () => {
    // ARRANGE: Renderiza a página completa dentro de um router
    render(<HomePage />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    // ASSERT (Estado Inicial): Verifica se ambas as receitas estão na tela antes da busca
    expect(screen.getByText('Muffin salgado para cães')).toBeInTheDocument();
    expect(screen.getByText('Biscoitinho saudável de atum')).toBeInTheDocument();

    // ACT (Ação do Usuário): Encontra o campo de busca e simula a digitação
    const searchInput = screen.getByPlaceholderText(/busca/i);
    await user.type(searchInput, 'cães');

    // ASSERT (Estado Final): Verifica se a lista foi filtrada corretamente
    // A receita de cães deve continuar na tela
    expect(screen.getByText('Muffin salgado para cães')).toBeInTheDocument();
    
    // A receita de gato não deve mais estar na tela
    expect(screen.queryByText('Biscoitinho saudável de atum')).toBeNull();
  });
});