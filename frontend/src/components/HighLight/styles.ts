import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle";

export const SHighLight = styled.section`
  background-color: ${colors.background};
  border: 0.3rem solid ${colors.primary};
  border-radius: 2rem;
  height: 45vh;
  width: 25vw;
  margin: 2%;
  margin-left: 1rem;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.03);
    filter: brightness(1.05);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    padding: 1rem;
  }

  img {
    height: auto;
    width: 20vw;
    background-color: transparent;
    margin-top: 5%;
    max-width: 100%;
  }

  h3 {
    background-color: transparent;
  }

  /* Responsividade */

  @media (max-width: 1024px) {
    width: 40vw;

    img {
      width: 35vw;
    }
  }

  @media (max-width: 768px) {
    width: 60vw;

    img {
      width: 55vw;
    }
  }

  @media (max-width: 480px) {
    width: 90vw;
    height: auto;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    img {
      width: 85vw;
      margin-top: 2%;
    }
  }
`;
