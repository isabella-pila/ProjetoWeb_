// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 1. O BrowserRouter é importado
import { BrowserRouter } from 'react-router-dom' 
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)