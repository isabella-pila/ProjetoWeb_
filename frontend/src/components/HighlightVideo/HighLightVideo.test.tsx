// src/components/HighlightVideo/HighlightVideo.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighlightVideo } from './';

describe('Componente: HighlightVideo', () => {

  it('deve renderizar o título e o vídeo corretamente', () => {
    // ARRANGE: Renderiza o componente.
    render(<HighlightVideo />);

    // ASSERT: Faz as verificações.

    // 1. Procura pelo título (heading) e verifica se ele está na tela.
    const titleElement = screen.getByRole('heading', {
      name: /receitas saudáveis para o seu pet/i,
    });
    expect(titleElement).toBeInTheDocument();

    // 2. Procura pelo iframe usando seu 'title' de acessibilidade.
    // Esta é a forma recomendada para encontrar iframes.
    const iframeElement = screen.getByTitle('YouTube video player');
    expect(iframeElement).toBeInTheDocument();

    // 3. (Opcional) Verifica se o 'src' do iframe está correto.
    expect(iframeElement).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/v7YnV7Wr7pQ?si=ywH90S46gLGJ9zLa'
    );
  });
});