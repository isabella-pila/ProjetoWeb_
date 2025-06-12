import styled from "styled-components";
import { colors } from "../../styles/GlobalStyle"; // seu arquivo de cores

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background-color: ${colors.background || "#fff"};
  min-height: 80vh;
`;

export const ProfileSection = styled.section`
  flex: 1;
  max-width: 400px;
  border: 1px solid ${colors.primary|| "#ccc"};
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${colors.background};

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1.2rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid ${colors.primary || "#ccc"};
    box-sizing: border-box;

    &:focus {
      border-color: ${colors.primary || "#007bff"};
      outline: none;
    }
  }
`;

export const RecipesSection = styled.section`
  flex: 2;
  padding: 1rem;

  h1 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .recipe-card {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${colors.primary || "#ccc"};
    padding-bottom: 1rem;
  }

  .unsave-button {
    margin-top: 0.5rem;
  }
`;
