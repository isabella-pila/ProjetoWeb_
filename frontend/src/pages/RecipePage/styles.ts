import styled from 'styled-components';
import { colors } from '../../styles/GlobalStyle';

export const MainContent = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const SaveRecipeButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #555;
  margin-bottom: 1.5rem;

  svg {
    fill: #555;
  }
`;

export const RecipeImage = styled.img`
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 0 auto 1.5rem auto;
  border-radius: 8px;
`;

export const RecipeDetails = styled.div`
  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${colors.primary};
    padding-bottom: 0.5rem;
  }

  ul, ol {
    line-height: 1.8;
    padding-left: 20px;
  }
`;

export const RatingSection = styled.div`
  margin-top: 2rem;
`;

export const StarsContainer = styled.div`
  input[type="radio"] {
    display: none;
  }

  .star {
    cursor: pointer;
    font-size: 2rem;
    margin-right: 5px;
    transition: color 0.2s ease-in-out;
  }
`;