import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle";

export const DestaqueSection = styled.div`
 margin-top: 10%;

section{
 background-color: ${colors.background};
  border: 0.3rem solid ${colors.primary};
  border-radius: 2rem;
  box-shadow: 5px 5px 20px ${colors.black};
  height: 50vh;
  width: 30vw;
  margin: 1.5rem auto 0 auto;
  padding-top: 1rem;
  justify-items: center;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.03);
    filter: brightness(1.05);
  }

  h3 {
    background-color: transparent;
    text-align: center;
    margin-bottom: 1rem;
  }
}
  iframe {
    height: 30vh;
    width: 25vw;
    background-color: transparent;
    margin-top: 5%;
  }
`;
