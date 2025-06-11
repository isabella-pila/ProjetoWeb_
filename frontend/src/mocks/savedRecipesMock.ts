import receita1 from '../assets/receita1.png'
import receita2 from '../assets/receita2.png'
import receita3 from '../assets/receita3.png'
import receita4 from '../assets/receita4.png'

export interface Recipe {
  id: string;
  title: string;
  image: string;
  saved: boolean;
}

export const savedRecipesMock: Recipe[] = [
  {
    id: "1",
    title: "Muffin salgado para cães",
    image: receita1,
    saved: true
  },
  {
    id: "2",
    title: "Biscoitinho Saudável de Atum",
    image: receita2,
    saved: true
  },
  {
    id: "3",
    title: "Pizza para cães",
    image: receita3,
    saved: true
  },
  {
    id: "4",
    title: "Sorvete de Banana para Pets",
    image: receita4,
    saved: false
  }
];
