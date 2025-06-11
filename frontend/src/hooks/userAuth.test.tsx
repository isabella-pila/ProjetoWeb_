import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React, { type ReactNode } from 'react';

// Importando valores e tipos separadamente para seguir a regra do TypeScript
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../contexts/AuthContext'; // Ajuste o caminho se necessário
import { useAuth } from './userAuth'; // O hook que estamos testando

describe('Hook: useAuth (Teste Isolado)', () => {
  it('deve lançar um erro se for usado fora de um AuthProvider', () => {
    // Escondemos o erro esperado do console para um output de teste limpo
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Renderizar sem o 'wrapper' garante que o contexto será nulo
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth deve ser usado com AuthProvider'
    );

    spy.mockRestore(); // Restaura a função original do console
  });

  it('deve retornar o valor do contexto quando usado dentro de um Provider', () => {
    // Criamos um valor de contexto FALSO (mock) apenas para este teste.
    const mockContextValue: AuthContextType = {
      currentUser: { id: 'mock-id', name: 'Usuário Mock', email: 'mock@email.com', role: 'user' },
      isLoading: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
    };

    // Criamos um 'wrapper' que fornece nosso contexto falso.
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockContextValue}>
        {children}
      </AuthContext.Provider>
    );

    // Renderizamos o hook com o nosso wrapper de teste
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Verificamos se o hook retornou exatamente o valor que fornecemos no contexto.
    expect(result.current).toBeDefined();
    expect(result.current.currentUser?.name).toBe('Usuário Mock');
    expect(result.current.logout).toBe(mockContextValue.logout);
  });
});