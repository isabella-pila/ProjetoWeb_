import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './index';

// Mock do componente Footer para isolar o teste do Layout
jest.mock('../../components/Footer', () => ({
  Footer: () => {
    return <footer>Rodapé Mock</footer>;
  },
}));

describe('Componente: Layout', () => {
  // A descrição foi ajustada para não mencionar o Header
  it('deve renderizar o conteúdo da página e o Footer corretamente', () => {
    const PaginaTeste = () => <div>Conteúdo da Página de Teste</div>;

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PaginaTeste />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verifica se o conteúdo que vem do Outlet está na tela
    expect(screen.getByText('Conteúdo da Página de Teste')).toBeInTheDocument();

    // Verifica se o Footer mockado foi renderizado
    expect(screen.getByText('Rodapé Mock')).toBeInTheDocument();
  });
});