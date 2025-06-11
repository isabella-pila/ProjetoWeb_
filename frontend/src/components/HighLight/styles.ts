import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle";

export const SHighLight = styled.section`
  background-color: ${colors.background};
  border: 0.3rem solid ${colors.primary};
  border-radius: 2rem;
  height: 45vh;
  width: 25vw;
  margin: 2%;
  margin-left:1rem;

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
    height: 30vh;
    width: 20vw;
    background-color: transparent;
    margin-top: 5%;
  }

  h3 {
    background-color: transparent;
  }
`;
