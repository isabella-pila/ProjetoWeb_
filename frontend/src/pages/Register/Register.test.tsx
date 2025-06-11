import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RegisterPage } from './'; // Ajuste o caminho se o seu arquivo se chamar 'index.tsx'

// --- MOCKS ---
vi.mock('../../components/Header', () => ({
  Header: () => <header data-testid="header-mock" />,
}));

const registerMock = vi.fn();
// Ajuste o caminho para o seu contexto de autenticação se for diferente
vi.mock('../../contexts/AuthContext', () => ({ 
  useAuth: () => ({ register: registerMock }),
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    useNavigate: () => navigateMock,
  };
});


describe('Página: RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve registrar um novo usuário e redirecionar para a home', async () => {
    const user = userEvent.setup();
    // CORREÇÃO: Simula uma pequena demora da rede
    registerMock.mockImplementation(() => {
      return new Promise(resolve => setTimeout(resolve, 10));
    });
    render(<RegisterPage />, { wrapper: BrowserRouter });

    await user.type(screen.getByLabelText(/nome/i), 'Novo Usuário');
    await user.type(screen.getByLabelText(/e-mail/i), 'novo@teste.com');
    await user.type(screen.getByLabelText(/^senha/i), 'senha123');
    await user.type(screen.getByLabelText(/confirma senha/i), 'senha123');
    await user.click(screen.getByRole('button', { name: /registrar/i }));

    // CORREÇÃO: Usa waitFor para esperar o estado de 'loading'
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /registrando.../i })).toBeDisabled();
    });

    expect(registerMock).toHaveBeenCalledWith('Novo Usuário', 'novo@teste.com', 'senha123');
    
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('deve exibir uma mensagem de erro se as senhas não coincidirem', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />, { wrapper: BrowserRouter });
    
    await user.type(screen.getByLabelText(/nome/i), 'Outro Usuário');
    await user.type(screen.getByLabelText(/e-mail/i), 'outro@teste.com');
    await user.type(screen.getByLabelText(/^senha/i), 'senha123');
    await user.type(screen.getByLabelText(/confirma senha/i), 'senhaDIFERENTE');
    await user.click(screen.getByRole('button', { name: /registrar/i }));

    // Usa a busca flexível por texto
    const errorMessage = await screen.findByText(/As senhas não coincidem/i);
    expect(errorMessage).toBeInTheDocument();
    
    expect(registerMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('deve exibir uma mensagem de erro se a função de registro falhar', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Este e-mail já está em uso';
    registerMock.mockRejectedValueOnce(new Error(errorMessage));
    render(<RegisterPage />, { wrapper: BrowserRouter });

    await user.type(screen.getByLabelText(/nome/i), 'Novo Usuário');
    await user.type(screen.getByLabelText(/e-mail/i), 'existente@teste.com');
    await user.type(screen.getByLabelText(/^senha/i), 'senha123');
    await user.type(screen.getByLabelText(/confirma senha/i), 'senha123');
    await user.click(screen.getByRole('button', { name: /registrar/i }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});