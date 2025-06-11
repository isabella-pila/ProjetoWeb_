import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './'; // Ajuste o caminho se o seu arquivo se chamar 'index.tsx'

// --- MOCKS ---
vi.mock('../../components/Header', () => ({
  Header: () => <header data-testid="header-mock" />,
}));

const loginMock = vi.fn();
// Ajuste o caminho para o seu hook de autenticação se for diferente
vi.mock('../../hooks/userAuth', () => ({ 
  useAuth: () => ({ login: loginMock }),
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    useNavigate: () => navigateMock,
  };
});


describe('Página: Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir o estado de carregamento e depois redirecionar em caso de sucesso', async () => {
    const user = userEvent.setup();
    // CORREÇÃO: Simula uma pequena demora da rede para o estado de loading ser renderizado
    loginMock.mockImplementation(() => {
      return new Promise(resolve => setTimeout(resolve, 10));
    });
    render(<Login />, { wrapper: BrowserRouter });

    await user.type(screen.getByLabelText(/e-mail/i), 'usuario@teste.com');
    await user.type(screen.getByLabelText(/senha/i), 'senha123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    // CORREÇÃO: Usa waitFor para esperar a UI ser atualizada para o estado de 'loading'
    await waitFor(() => {
      const loadingButton = screen.getByRole('button', { name: /entrando.../i });
      expect(loadingButton).toBeDisabled();
    });

    expect(loginMock).toHaveBeenCalledWith('usuario@teste.com', 'senha123');
    
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('deve exibir uma mensagem de erro se as credenciais forem inválidas', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Credenciais inválidas';
    loginMock.mockRejectedValueOnce(new Error(errorMessage));
    render(<Login />, { wrapper: BrowserRouter });
    
    await user.type(screen.getByLabelText(/e-mail/i), 'usuario@errado.com');
    await user.type(screen.getByLabelText(/senha/i), 'senhaerrada');
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('não deve tentar fazer login se os campos estiverem vazios', async () => {
    const user = userEvent.setup();
    render(<Login />, { wrapper: BrowserRouter });
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    expect(loginMock).not.toHaveBeenCalled();
  });
});