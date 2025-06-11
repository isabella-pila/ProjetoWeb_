// Importações do Vitest e da React Testing Library
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Emphasis } from './';

const mockRecipes = [
  {
    id: 1,
    title: 'Muffin salgado para cães',
    category: 'cachorro',
    src: './src/assets/receita1.png',
    href: 'receita1.html',
  },
  {
    id: 2,
    title: 'Biscoitinho saudável de atum',
    category: 'gato',
    src: './src/assets/receita2.png',
    href: 'receita2.html',
  },
  {
    id: 3,
    title: 'Pizza para cães',
    category: 'cachorro',
    src: './src/assets/receita3.png',
    href: 'receita3.html',
  },
  {
    id: 4,
    title: 'Muffin salgado para gatos',
    category: 'gato',
    src: './src/assets/receita4.png',
    href: 'receita4.html',
  },
];

// 2. Mock do caminho do arquivo de mocks e dos componentes filhos.
// ATUALIZADO para 'src/data/recipesMock'
vi.mock('../../data/recipesMock', () => ({
  recipes: mockRecipes,
}));

vi.mock('../HighLight', () => ({
  HighLight: ({ title, href }: { title: string; href: string }) => (
    <a href={href}>{title}</a>
  ),
}));

vi.mock('../HighlightVideo', () => ({
  HighlightVideo: () => <div data-testid="highlight-video-mock" />,
}));

// --- SUÍTE DE TESTES (ATUALIZADA) ---
describe('Componente: Emphasis', () => {

  it('deve renderizar todos os destaques quando o termo de busca está vazio', () => {
    render(<Emphasis searchTerm="" />);

    // ATUALIZADO para procurar pelos títulos reais
    expect(screen.getByText('Muffin salgado para cães')).toBeInTheDocument();
    expect(screen.getByText('Biscoitinho saudável de atum')).toBeInTheDocument();
    expect(screen.getByText('Pizza para cães')).toBeInTheDocument();
    expect(screen.getByText('Muffin salgado para gatos')).toBeInTheDocument();
    
    expect(screen.queryByText('Nenhuma receita encontrada.')).toBeNull();
  });

  it('deve filtrar e renderizar apenas as receitas correspondentes ao termo de busca (pelo título)', () => {
    // ATUALIZADO para procurar por "muffin"
    render(<Emphasis searchTerm="muffin" />);

    // Deve encontrar as duas receitas de muffin
    expect(screen.getByText('Muffin salgado para cães')).toBeInTheDocument();
    expect(screen.getByText('Muffin salgado para gatos')).toBeInTheDocument();
    
    // As outras não devem aparecer
    expect(screen.queryByText('Biscoitinho saudável de atum')).toBeNull();
    expect(screen.queryByText('Pizza para cães')).toBeNull();
  });

  it('deve filtrar e renderizar apenas as receitas correspondentes ao termo de busca (pela categoria)', () => {
    // ATUALIZADO para procurar por "gato"
    render(<Emphasis searchTerm="gato" />);

    // Deve encontrar as duas receitas de gato
    expect(screen.getByText('Biscoitinho saudável de atum')).toBeInTheDocument();
    expect(screen.getByText('Muffin salgado para gatos')).toBeInTheDocument();
    
    // As de cachorro não devem aparecer
    expect(screen.queryByText('Muffin salgado para cães')).toBeNull();
    expect(screen.queryByText('Pizza para cães')).toBeNull();
  });

  it('deve exibir a mensagem "Nenhuma receita encontrada" se o filtro não encontrar resultados', () => {
    render(<Emphasis searchTerm="receita-inexistente-123" />);

    expect(screen.getByText('Nenhuma receita encontrada.')).toBeInTheDocument();
    expect(screen.queryByText('Muffin salgado para cães')).toBeNull();
  });

  it('deve sempre renderizar o título principal e o vídeo em destaque', () => {
    render(<Emphasis searchTerm="" />);

    expect(screen.getByRole('heading', { name: /destaques/i })).toBeInTheDocument();
    expect(screen.getByTestId('highlight-video-mock')).toBeInTheDocument();
  });
});