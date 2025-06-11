// src/components/Button/Button.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Importa o componente que vamos testar
import { Button } from './';

describe('Componente: Button', () => {

  // Teste 1: Verifica a renderização básica e o conteúdo
  it('deve renderizar com o texto correto', () => {
    // Arrange: Renderiza o botão com um texto filho.
    render(<Button>Clique Aqui</Button>);

    // Act/Assert: Procura o botão pelo seu "nome acessível" (o texto dentro dele)
    // e afirma que ele está presente no documento.
    const buttonElement = screen.getByRole('button', { name: /clique aqui/i });
    expect(buttonElement).toBeInTheDocument();
  });

  // Teste 2: Verifica a interação de clique
  it('deve chamar a função onClick quando for clicado', async () => {
    // Arrange: Cria uma função "espiã" (mock) e configura o user-event.
    const onClickMock = vi.fn();
    const user = userEvent.setup();
    
    // Renderiza o botão passando a função mock como prop.
    render(<Button onClick={onClickMock}>Enviar</Button>);
    const buttonElement = screen.getByRole('button', { name: /enviar/i });

    // Act: Simula o clique do usuário no botão.
    await user.click(buttonElement);

    // Assert: Verifica se a função espiã foi chamada exatamente uma vez.
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  // Teste 3: Verifica o estado desabilitado
  it('deve estar desabilitado quando a prop "disabled" for passada', () => {
    // Arrange: Renderiza o botão com a propriedade 'disabled'.
    render(<Button disabled>Desabilitado</Button>);
    const buttonElement = screen.getByRole('button', { name: /desabilitado/i });

    // Assert: Verifica se o botão está, de fato, desabilitado.
    expect(buttonElement).toBeDisabled();
  });

  it('não deve chamar a função onClick se estiver desabilitado', async () => {
    // Arrange
    const onClickMock = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={onClickMock} disabled>
        Não Clicável
      </Button>
    );
    const buttonElement = screen.getByRole('button', { name: /não clicável/i });

    // Act
    await user.click(buttonElement);

    // Assert: Garante que a função de clique não foi chamada.
    expect(onClickMock).not.toHaveBeenCalled();
  });
});