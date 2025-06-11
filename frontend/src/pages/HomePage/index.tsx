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
     
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        {/* 2. O 'to' do Link corresponde ao 'path' que você definiu no App.tsx */}
       <Header onSearchChange={handleSearchChange} />
       
        <Emphasis searchTerm={searchTerm}  />

      </nav>
  );
}