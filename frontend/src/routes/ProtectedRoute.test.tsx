import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
// --- CORREÇÃO: Importamos o MÓDULO inteiro para usar o spyOn ---
import * as AuthHook from '../hooks/userAuth';
import type { AuthContextType } from '../contexts/AuthContext';
import type { UserProps } from '../types/UserType';

// --- SUÍTE DE TESTES ---
describe('Componente: ProtectedRoute', () => {
  // --- CORREÇÃO: Usamos spyOn no lugar de vi.mock ---
  const useAuthSpy = vi.spyOn(AuthHook, 'useAuth');

  const mockAuthBase: AuthContextType = {
    isLoading: false,
    currentUser: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
  };
  
  beforeEach(() => {
    // Limpa o histórico de chamadas do spy, mas não o remove
    useAuthSpy.mockClear();
  });

  const ProtectedChild = () => <div data-testid="protected-content">Conteúdo Protegido</div>;

  it('deve exibir a mensagem de "Carregando..." enquanto isLoading for true', () => {
    // Agora usamos o spy para definir o valor de retorno
    useAuthSpy.mockReturnValue({
      ...mockAuthBase,
      isLoading: true,
    });
    render(<ProtectedRoute><ProtectedChild /></ProtectedRoute>);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('deve redirecionar para /login se não houver usuário logado', () => {
    useAuthSpy.mockReturnValue(mockAuthBase);
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page">Página de Login</div>} />
          <Route path="/protected" element={<ProtectedRoute><ProtectedChild /></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('deve redirecionar para a home ("/") se um usuário não-admin tentar acessar uma rota de admin', () => {
    const commonUser: UserProps = { id: '1', name: 'User', email: 'u@u.com', role: 'user' };
    useAuthSpy.mockReturnValue({
      ...mockAuthBase,
      currentUser: commonUser,
    });
    render(
      <MemoryRouter initialEntries={['/admin-route']}>
        <Routes>
          <Route path="/" element={<div data-testid="home-page">Página Inicial</div>} />
          <Route path="/admin-route" element={<ProtectedRoute requireAdmin><ProtectedChild /></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
  
  it('deve renderizar os filhos para um usuário logado em uma rota protegida padrão', () => {
    const commonUser: UserProps = { id: '1', name: 'User', email: 'u@u.com', role: 'user' };
    useAuthSpy.mockReturnValue({
      ...mockAuthBase,
      currentUser: commonUser,
    });
    render(
      <MemoryRouter><ProtectedRoute><ProtectedChild /></ProtectedRoute></MemoryRouter>
    );
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('deve renderizar os filhos para um usuário admin em uma rota de admin', () => {
    const adminUser: UserProps = { id: '1', name: 'Admin', email: 'admin@a.com', role: 'admin' };
    useAuthSpy.mockReturnValue({
      ...mockAuthBase,
      currentUser: adminUser,
    });
    render(
      <MemoryRouter><ProtectedRoute requireAdmin><ProtectedChild /></ProtectedRoute></MemoryRouter>
    );
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });
});