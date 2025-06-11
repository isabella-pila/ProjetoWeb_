import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AuthProvider, useAuth } from './AuthContext';
import { mockUsers } from '../mocks/UserMock';

// Componente de teste para consumir o contexto
const TestComponent = () => {
  const { currentUser, isLoading, login, logout, register } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {currentUser ? (
        <div>
          <p>Usuário Logado: {currentUser.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Nenhum usuário logado</p>
      )}

      {/* Formulários simplificados para teste */}
      <button onClick={() => login('admin@example.com', 'admin123')}>Login Válido</button>
      <button onClick={() => login('wrong@email.com', '123')}>Login Inválido</button>
      <button onClick={() => register('New User', 'new@example.com', 'new123')}>Registrar Válido</button>
      <button onClick={() => register('Admin User', 'admin@example.com', 'admin123')}>Registrar Inválido</button>
    </div>
  );
};

describe('Testes para AuthContext e AuthProvider', () => {

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // --- TESTE CORRIGIDO ---
  it('deve aguardar o carregamento e exibir o estado de "nenhum usuário logado"', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Aguarda o estado final, que é o que importa
    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
      expect(screen.getByText('Nenhum usuário logado')).toBeInTheDocument();
    });
  });

  it('deve carregar o usuário do localStorage no estado inicial', async () => {
    const adminUser = mockUsers.find(u => u.role === 'admin')!;
    const { password: _, ...userToStore } = adminUser;
    localStorage.setItem('currentUser', JSON.stringify(userToStore));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Usuário Logado: ${userToStore.name}`)).toBeInTheDocument();
    });
  });

  it('deve realizar o login com sucesso e armazenar no localStorage', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => expect(screen.getByText('Login Válido')).toBeInTheDocument());
    
    const loginButton = screen.getByText('Login Válido');
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Usuário Logado: Admin User')).toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('currentUser')!)).toEqual(
        expect.objectContaining({ name: 'Admin User', email: 'admin@example.com' })
      );
    });
  });

  it('deve realizar o logout com sucesso e limpar o localStorage', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Login Válido');
    await user.click(loginButton);
    
    await waitFor(() => expect(screen.getByText('Usuário Logado: Admin User')).toBeInTheDocument());

    const logoutButton = screen.getByText('Logout');
    await user.click(logoutButton);

    expect(screen.getByText('Nenhum usuário logado')).toBeInTheDocument();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });
    
  it('deve registrar um novo usuário com sucesso', async () => {
    const user = userEvent.setup();
    render(
        <AuthProvider>
            <TestComponent />
        </AuthProvider>
    );
    
    await waitFor(() => expect(screen.getByText('Registrar Válido')).toBeInTheDocument());
    
    const registerButton = screen.getByText('Registrar Válido');
    await user.click(registerButton);
    
    await waitFor(() => {
        expect(screen.getByText('Usuário Logado: New User')).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('currentUser')!).name).toBe('New User');
    });
  });
    
  it('deve lançar um erro se useAuth for usado fora de um AuthProvider', () => {
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Agora este teste vai PASSAR
    expect(() => render(<TestComponent />)).toThrow('useAuth deve ser usado com AuthProvider');
    
    spy.mockRestore();
  });
});