// src/App.tsx

import { Toaster } from 'react-hot-toast'; // 1. Importe o Toaster
import { GlobalStyle } from "./styles/GlobalStyle";
import { RouteWeb } from "./routes";

export function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster 
        position="top-right" // Define a posição dos alertas na tela
        toastOptions={{
          duration: 4000, // Duração de 4 segundos
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <RouteWeb />
    </>
  );
}

export default App;