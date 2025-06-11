// 1. Importações do Vitest e da React Testing Library
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// 2. Importa o componente que será testado
import { Footer } from './';

// 'describe' agrupa os testes para o componente Footer
describe('Componente: Footer', () => {

  // 'it' define o caso de teste específico
  it('deve renderizar o texto do rodapé corretamente', () => {
    // ARRANGE: Renderiza o componente Footer na tela virtual
    render(<Footer />);

    // ACT & ASSERT: Procura pelo texto "@petfit" na tela e afirma que ele existe.
    // Usamos getByText para encontrar um elemento pelo seu conteúdo de texto.
    const footerTextElement = screen.getByText(/@petfit/i);

    // Verificamos se o elemento com o texto foi encontrado no documento.
    expect(footerTextElement).toBeInTheDocument();
  });
});