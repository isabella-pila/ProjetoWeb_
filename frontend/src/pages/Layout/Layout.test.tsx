// src/pages/Layout/Layout.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Importa o componente que vamos testar
import { Layout } from './';

// --- MOCK DAS DEPENDÊNCIAS ---
// Mockamos os componentes Header e Footer para isolar o teste no Layout.
// Em vez dos componentes reais, renderizaremos um texto simples para identificá-los.

vi.mock('../../components/Header', () => ({
  // O componente Header será substituído por esta função simples durante o teste
  Header: () => {
    return <header>Header Mock</header>;
  },
}));

vi.mock('../../components/Footer', () => ({
  // O componente Footer será substituído por esta função simples
  Footer: () => {
    return <footer>Footer Mock</footer>;
  },
}));


// --- SUÍTE DE TESTES ---
describe('Componente: Layout', () => {
  it('deve renderizar o Header, o Footer e o conteúdo filho corretamente', () => {
    // ARRANGE: Renderiza o componente Layout, passando um elemento filho para ele.
    render(
      <Layout>
        <div data-testid="child-content">Conteúdo da Página</div>
      </Layout>
    );

    // ASSERT: Faz as verificações.

    // 1. Verifica se o nosso Header mockado está na tela.
    const headerElement = screen.getByText('Header Mock');
    expect(headerElement).toBeInTheDocument();

    // 2. Verifica se o nosso Footer mockado está na tela.
    const footerElement = screen.getByText('Footer Mock');
    expect(footerElement).toBeInTheDocument();

    // 3. Verifica se o conteúdo filho que passamos para o Layout está na tela.
    const childElement = screen.getByTestId('child-content');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Conteúdo da Página');

    // 4. (Opcional, mas recomendado) Verifica se o conteúdo filho está dentro da tag <main>.
    // Isso garante que a estrutura semântica do Layout está correta.
    expect(childElement.parentElement?.tagName).toBe('MAIN');
  });
});