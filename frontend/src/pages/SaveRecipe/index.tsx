import { useState } from "react";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/HighLight";
import { Button } from "../../components/Button";
import { savedRecipesMock } from "../../mocks/savedRecipesMock";
import { useAuth } from "../../hooks/userAuth";

export function SavedRecipes() {
  const { currentUser, setUserName } = useAuth();

  const [recipes, setRecipes] = useState(
    savedRecipesMock.filter((recipe) => recipe.saved)
  );

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || "");

  const handleUnsaveRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const handleSaveName = () => {
    if (newName.trim()) {
      setUserName(newName.trim());
      setEditingName(false);
    }
  };

  return (
    
    <>
    
      <Header onSearchChange={() => {}} />

      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1rem" }}>Receitas Salvas 🐾</h1>

        {/* 🧑 Nome do usuário editável */}
        <div style={{ marginBottom: "2rem" }}>
          {editingName ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  marginRight: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <Button onClick={handleSaveName}>Salvar</Button>
            </>
          ) : (
            <>
              <p>
                Olá, <strong>{currentUser?.name}</strong>!
              </p>
              <Button onClick={() => setEditingName(true)}>Editar nome</Button>
            </>
          )}
        </div>

        {/* 📋 Lista de receitas */}
        {recipes.length === 0 ? (
          <p className="empty-message">Você ainda não salvou nenhuma receita.</p>
        ) : (
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card" style={{ marginBottom: "2rem" }}>
                <HighLight
                  href={`/recipe/${recipe.id}`}
                  title={recipe.title}
                  src={recipe.image}
                />
                <Button
                  onClick={() => handleUnsaveRecipe(recipe.id)}
                  className="unsave-button"
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
