
import { HighLight } from "../HighLight";
import { HighlightVideo } from "../HighlightVideo";
import { EmphasisWrapper, SEmphasis } from "./styled";
import { recipes } from "../../mocks/RecipesMock";

interface EmphasisProps {
  searchTerm: string;
}

export function Emphasis({ searchTerm }: EmphasisProps) {
 
  const filteredRecipes = recipes.filter((recipe) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(lowerSearch) ||
      recipe.category.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <EmphasisWrapper>
      <HighlightVideo />

      <SEmphasis>
        <h1>Destaques 🐾</h1>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(({ id, href, title, src }) => (
            <HighLight key={id} href={href} title={title} src={src} />
          ))
        ) : (
          <p>Nenhuma receita encontrada.</p>
        )}
      </SEmphasis>
    </EmphasisWrapper>
  );
}
