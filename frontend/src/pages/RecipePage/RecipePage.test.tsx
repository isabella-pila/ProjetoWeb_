// src/pages/RecipePage/RecipePage.test.tsx (VERSÃO SIMPLIFICADA E CORRIGIDA)

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RecipePage from './';

// --- MOCK DAS DEPENDÊNCIAS (COM A CORREÇÃO FINAL) ---

// Mock das receitas (continua igual, já estava correto)
vi.mock('../../mocks/recipes', () => ({
  recipes: [
    {
      id: '1',
      title: 'Bolo de Cenoura para Pets',
      ingredients: ['1 cenoura'],
      instructions: ['Misture tudo.'],
    },
  ],
}));

// Mock do Header e outros componentes
vi.mock('../../components/Header', () => ({ Header: () => <header /> }));
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

// CORREÇÃO DEFINITIVA DO MOCK do useAuth
vi.mock('../../hooks/userAuth', () => ({
  // A fábrica do mock agora retorna uma função...
  useAuth: () => ({
    // ...que, ao ser chamada no componente, retorna o nosso objeto mockado.
    // Isso evita o uso de variáveis externas e o erro de hoisting.
    currentUser: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// --- SUÍTE DE TESTE MÍNIMA ---
describe('Página: RecipePage (Teste de Diagnóstico)', () => {

  it('deve renderizar o título da receita quando um ID válido é fornecido', () => {
    // ARRANGE: Renderiza a página em uma rota que corresponde ao ID '1'
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Routes>
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
        </Routes>
      </MemoryRouter>
    );

    // ASSERT: Verifica se o título da receita do nosso mock apareceu na tela.
    const headingElement = screen.getByRole('heading', {
      name: /bolo de cenoura para pets/i,
    });
    
    expect(headingElement).toBeInTheDocument();
  });
});