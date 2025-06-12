import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle";

export const DestaqueSection = styled.div`
  margin-top: 10%;

  section {
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

  /* Responsividade */

  @media (max-width: 1024px) {
    section {
      width: 50vw;
      height: 40vh;
    }
    iframe {
      width: 40vw;
      height: 25vh;
    }
  }

  @media (max-width: 768px) {
    section {
      width: 70vw;
      height: 35vh;
    }
    iframe {
      width: 65vw;
      height: 20vh;
    }
  }

  @media (max-width: 480px) {
    section {
      width: 90vw;
      height: auto;
      margin: 1rem auto 0 auto;
      padding: 1rem;
    }
    iframe {
      width: 85vw;
      height: 18vh;
      margin-top: 3%;
    }
  }
`;
