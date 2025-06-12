// Arquivo: src/pages/Login/Login.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './'; // Garanta que este caminho está correto

// --- MOCKS ---

// Mock do Header para não interferir no teste do Login
vi.mock('../../components/Header', () => ({
  Header: () => <header data-testid="header-mock" />,
}));

// Mock do hook de autenticação
const loginMock = vi.fn();
vi.mock('../../hooks/userAuth', () => ({
  useAuth: () => ({ login: loginMock }),
}));

// Mock do hook de navegação para verificar o redirecionamento
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    useNavigate: () => navigateMock,
  };
});


// --- TESTES ---

describe('Página: Login', () => {
  // Limpa todos os mocks antes de cada teste para garantir o isolamento
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir o estado de carregamento e depois redirecionar em caso de sucesso', async () => {
    const user = userEvent.setup();
    // Prepara o mock para simular um login bem-sucedido
    loginMock.mockResolvedValue(undefined);

    render(<Login />, { wrapper: BrowserRouter });

    // Simula o usuário preenchendo o formulário
    await user.type(screen.getByLabelText(/e-mail/i), 'usuario@teste.com');
    await user.type(screen.getByLabelText(/senha/i), 'senha123');

    // Simula o clique no botão de entrar
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    // VERIFICAÇÃO IMEDIATA: Checa se o botão entrou em estado de carregamento logo após o clique
    const loadingButton = screen.getByRole('button', { name: /entrando.../i });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();

    // VERIFICAÇÃO ASSÍNCRONA: Espera a conclusão da promessa e verifica se o redirecionamento ocorreu
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });

    // Garante que a função de login foi chamada com os dados corretos
    expect(loginMock).toHaveBeenCalledWith('usuario@teste.com', 'senha123');
  });

  it('deve exibir uma mensagem de erro se as credenciais forem inválidas', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Credenciais inválidas';
    // Prepara o mock para simular um erro de login
    loginMock.mockRejectedValueOnce(new Error(errorMessage));

    render(<Login />, { wrapper: BrowserRouter });
    
    // Simula o preenchimento com dados incorretos
    await user.type(screen.getByLabelText(/e-mail/i), 'usuario@errado.com');
    await user.type(screen.getByLabelText(/senha/i), 'senhaerrada');
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    // Espera a mensagem de erro aparecer na tela
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    // Garante que o usuário não foi redirecionado
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('não deve tentar fazer login se os campos estiverem vazios', async () => {
    const user = userEvent.setup();
    render(<Login />, { wrapper: BrowserRouter });

    // Simula o clique no botão sem preencher os campos
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    // Garante que a função de login não foi chamada
    expect(loginMock).not.toHaveBeenCalled();
  });
});