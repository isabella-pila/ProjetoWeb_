// src/pages/NotFoundPage/NotFoundPage.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from './';

describe('Página: NotFoundPage', () => {

  it('deve renderizar o conteúdo da página 404 e o link para a home', () => {
    // ARRANGE: Renderiza o componente.
    // Como o componente usa o <Link> do react-router-dom, precisamos envolvê-lo
    // em um <BrowserRouter> para que o teste não quebre.
    render(<NotFoundPage />, { wrapper: BrowserRouter });

    // ASSERT: Faz as verificações.

    // 1. Verifica se o título principal está na tela.
    const heading = screen.getByRole('heading', {
      name: /404 - página não encontrada/i,
    });
    expect(heading).toBeInTheDocument();

    // 2. Verifica se o parágrafo de descrição está na tela.
    const paragraph = screen.getByText(
      'A página que você está procurando não existe.'
    );
    expect(paragraph).toBeInTheDocument();

    // 3. Verifica se o link para a página inicial está na tela.
    const link = screen.getByRole('link', {
      name: /voltar para a página inicial/i,
    });
    expect(link).toBeInTheDocument();

    // 4. (Opcional, mas recomendado) Verifica se o link aponta para o destino correto ('/').
    expect(link).toHaveAttribute('href', '/');
  });
});