// src/routes/RouteWeb.tsx
import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { HomePage } from "../pages/HomePage";
import RecipePage  from "../pages/RecipePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute"; // Corrigido o nome do arquivo
import { SavedRecipes } from "../pages/SaveRecipe";

import { Layout } from "../pages/Layout";


export function RouteWeb() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipe/:recipeId" element={<RecipePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Rotas protegidas */}
        <Route
          path="receitas-salvas"
          element={
            <ProtectedRoute>
              <SavedRecipes />
            </ProtectedRoute>
          }
        />
        
        {/* Exemplo de rota protegida apenas para admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requireAdmin>
              <div>Página de Administração</div>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}