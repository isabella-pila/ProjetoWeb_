// src/pages/HomePage/index.tsx

import { useState } from "react";

import { Emphasis } from "../../components/Emphasis";
import { Header } from '../../components/Header';



export function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }
  return (
     
      <nav>
        
       <Header onSearchChange={handleSearchChange} />
       
        <Emphasis searchTerm={searchTerm}  />

      </nav>
  );
}