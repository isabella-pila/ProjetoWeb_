// src/App.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
// 1. Importe as funções de teste do 'vitest'
import { describe, test, expect, vi } from 'vitest';

import App from './App';

// 2. Use 'vi.mock' em vez de 'jest.mock'
vi.mock('./routes', () => ({
  RouteWeb: () => (
    <div>
      <h1>Página Inicial</h1>
      <button onClick={() => toast.success('Ação bem-sucedida!')}>
        Mostrar Toast
      </button>
    </div>
  ),
}));

describe('Testes de Integração para App', () => {
  test('deve renderizar o componente principal e o conteúdo da rota inicial', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Página Inicial/i)).toBeInTheDocument();
  });

  test('deve exibir uma notificação do react-hot-toast quando uma ação é disparada', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const toastButton = screen.getByRole('button', { name: /Mostrar Toast/i });
    fireEvent.click(toastButton);

    const toastMessage = await screen.findByText('Ação bem-sucedida!');
    expect(toastMessage).toBeInTheDocument();

    if (toastMessage.parentElement) {
      expect(toastMessage.parentElement).toHaveStyle('background: #363636');
      expect(toastMessage.parentElement).toHaveStyle('color: #fff');
    }
  });
});