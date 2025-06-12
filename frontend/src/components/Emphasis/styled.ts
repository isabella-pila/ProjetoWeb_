import styled from "styled-components";

export const EmphasisWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

export const SEmphasis = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: auto;

  h1 {
    grid-column: 1 / -1;
    text-align: center;
  }

  /* Responsividade */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;  /* Uma coluna só em telas pequenas */
    gap: 1rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* Duas colunas em tablets */
    gap: 1rem;
  }
`;
