import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { RouteWeb } from './index';
import * as AuthHook from '../hooks/userAuth';
// --- CORREÇÃO: Importamos o tipo do contexto para criar um mock seguro ---
import type { AuthContextType } from '../contexts/AuthContext';
import type { UserProps } from '../types/UserType';

// Mocks dos componentes de página (permanecem iguais)
vi.mock('../pages/HomePage', () => ({ HomePage: () => <div data-testid="page-home" /> }));
vi.mock('../pages/Login', () => ({ Login: () => <div data-testid="page-login" /> }));
vi.mock('../pages/Register', () => ({ RegisterPage: () => <div data-testid="page-register" /> }));
vi.mock('../pages/RecipePage', () => ({ default: () => <div data-testid="page-recipe-detail" /> }));
vi.mock('../pages/SaveRecipe', () => ({ SavedRecipes: () => <div data-testid="page-saved-recipes" /> }));
vi.mock('../pages/NotFoundPage', () => ({ NotFoundPage: () => <div data-testid="page-not-found" /> }));
vi.mock('../components/Footer', () => ({ Footer: () => <footer data-testid="footer" /> }));

const renderWithRouter = (initialRoute: string) => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <RouteWeb />
    </MemoryRouter>
  );
};

describe('Roteamento Principal - RouteWeb', () => {
  const useAuthSpy = vi.spyOn(AuthHook, 'useAuth');

  // --- CORREÇÃO: Objeto base para o mock, com todos os campos tipados ---
  const mockAuthBase: AuthContextType = {
    isLoading: false,
    currentUser: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
  };

  beforeEach(() => {
    useAuthSpy.mockClear();
  });

  describe('Rotas Públicas', () => {
    it('deve renderizar a HomePage na rota raiz ("/")', () => {
      // Usamos o mock base diretamente, pois ele já representa o estado "deslogado"
      useAuthSpy.mockReturnValue(mockAuthBase);
      renderWithRouter('/');
      expect(screen.getByTestId('page-home')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('deve renderizar a LoginPage na rota "/login"', () => {
      useAuthSpy.mockReturnValue(mockAuthBase);
      renderWithRouter('/login');
      expect(screen.getByTestId('page-login')).toBeInTheDocument();
    });

    it('deve renderizar a RegisterPage na rota "/register"', () => {
      useAuthSpy.mockReturnValue(mockAuthBase);
      renderWithRouter('/register');
      expect(screen.getByTestId('page-register')).toBeInTheDocument();
    });
  });

  describe('Rotas Protegidas', () => {
    it('DEVE permitir acesso a /receitas-salvas para um usuário logado', () => {
      const loggedInUser: UserProps = { id: '1', name: 'Usuário Teste', email: 'a@a.com', role: 'user' };
      // Usamos o mock base e sobrescrevemos apenas o currentUser
      useAuthSpy.mockReturnValue({ 
        ...mockAuthBase, 
        currentUser: loggedInUser 
      });
      
      renderWithRouter('/receitas-salvas');
      
      expect(screen.getByTestId('page-saved-recipes')).toBeInTheDocument();
    });

    it('DEVE permitir acesso a /admin para um usuário admin', () => {
      const adminUser: UserProps = { id: '1', name: 'Admin Teste', email: 'admin@a.com', role: 'admin' };
      // Usamos o mock base e sobrescrevemos apenas o currentUser
      useAuthSpy.mockReturnValue({ 
        ...mockAuthBase, 
        currentUser: adminUser 
      });

      renderWithRouter('/admin');

      // Este teste depende da implementação real do seu componente de admin
      expect(screen.getByText('Página de Administração')).toBeInTheDocument();
    });
  });
});