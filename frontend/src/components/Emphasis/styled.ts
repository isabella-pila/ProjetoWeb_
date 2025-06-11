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
`;
