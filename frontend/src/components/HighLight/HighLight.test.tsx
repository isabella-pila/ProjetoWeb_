// src/components/HighLight/HighLight.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Importa o componente que vamos testar
import { HighLight } from './';

describe('Componente: HighLight', () => {
  it('deve renderizar o link, título e imagem com as props corretas', () => {
    // ARRANGE: Prepara os dados (props) que serão passados para o componente.
    const mockProps = {
      href: '/receita-teste',
      title: 'Bolo de Cenoura para Pets',
      src: 'caminho/para/imagem.jpg',
    };

    // ACT: Renderiza o componente com as props de teste.
    render(<HighLight {...mockProps} />);

    // ASSERT: Faz as verificações.

    // 1. Verifica o link: procura por um elemento com a "role" de link
    // e confirma que seu atributo 'href' está correto.
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockProps.href);

    // 2. Verifica o título: procura por um elemento com a "role" de heading (cabeçalho)
    // e o nome correspondente ao título.
    const titleElement = screen.getByRole('heading', {
      name: mockProps.title,
    });
    expect(titleElement).toBeInTheDocument();

    // 3. Verifica a imagem: procura pela imagem usando seu texto alternativo (alt).
    const imageElement = screen.getByAltText(
      `Imagem Receita ${mockProps.title}`
    );
    expect(imageElement).toBeInTheDocument();
    // Confirma também que o 'src' (caminho da imagem) está correto.
    expect(imageElement).toHaveAttribute('src', mockProps.src);
  });
});