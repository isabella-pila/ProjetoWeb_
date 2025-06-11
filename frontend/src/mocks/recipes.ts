// Interface para definir a estrutura de cada objeto de receita
export interface IRecipe {
  id: string; 
  title: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
}

// Nosso "banco de dados" de receitas
export const recipes: IRecipe[] = [
  {
    id: 'muffin-salgado-para-cachorros',
    title: 'Muffin Salgado Para Cachorros',
    imageUrl: '/src/assets/receita1.png',
    ingredients: [
      '½ lata de milho cozido.',
      '2 ovos.',
      '1 colher de sopa de azeite de oliva.',
      '½ xícara de farinha de aveia integral.',
      '1 colher de chá de de fermento em pó.',
      'Cenoura ralada.',
      'Frango cozido a gosto ou patê para cachorro.',
      'Uma pitada de sal.'
    ],
    instructions: [
      'Bata o milho, os ovos e o azeite no liquidificador.',
      'Coloque a farinha de aveia aos poucos e bata.',
      'Adicione o frango/patê, cenoura, sal, fermento e mexa.',
      'Pré-aqueça o forno a 180°.',
      'Use forminhas de silicone ou uma forma untada.',
      'Asse por aproximadamente 30 minutos.',
      'Faça o teste do palito; se sair limpo, está pronto.',
      'Espere esfriar para servir.'
    ]
  },
{
    id: 'bolinhos-saudaveis-de-frango',
    title: 'Bolinhos saudáveis de Frango',
    imageUrl: '/src/assets/receita2.png',
    ingredients: [
      '1/2 xícara de frango cozido e desfiado (sem sal ou temperos)',
      '2 colheres de sopa de cenoura ralada fina (crua ou cozida)',
      '1 colher de sopa de abóbora cozida e amassada',
      '1 ovo',
      '1 colher de sopa de farinha de aveia (ou farinha de arroz)'
    ],
    instructions: [
      'Preaqueça o forno a 180°C.',
      'Em uma tigela, misture o frango, a cenoura, a abóbora e o ovo.',
      'Acrescente a farinha de aveia aos poucos, até a massa ficar modelável (tipo massa de almôndega).',
      'Modele bolinhos pequenos (do tamanho de uma colher de chá).',
      'Coloque em uma forma levemente untada com óleo de coco ou forrada com papel manteiga.',
      'Asse por 12 a 15 minutos, ou até ficarem levemente dourados.',
      'Espere esfriar completamente antes de oferecer ao seu gatinho.'
    ]
  },
  {
    id: 'bolinho-de-atum',
    title: 'Bolinho de Atum',
    imageUrl: '/src/assets/receita3.png',
    ingredients: [
      '1 lata de atum conservado em água e sem sal',
      '1 xícara (de chá) de farinha de aveia',
      '1/2 xícara (de chá) de abóbora fervida',
      '1 ovo',
      '1 colher (de sopa) de azeite',
      '1 colher (de sopa) de catnip seco'
    ],
    instructions: [
      'Coloque todos os ingredientes no processador de alimentos e bata até que a massa esteja homogênea.',
      'Pré aqueça o forno em 180 graus, forre uma assadeira com papel manteiga e reserve.',
      'Unte as mãos e faça pequenas bolinhas com a massa, coloque na assadeira e dê uma apertadinha no centro de cada bolinha.',
      'Leve ao forno e asse por 12 a 14 minutos ou até que seus petiscos estejam douradinhos.',
      'Deixe esfriar completamente.',
      'Guarde em um recipiente e conserve na geladeira por no máximo 4 dias.'
    ]
  },
{
    id: 'pizza-para-cachorro',
    title: 'Pizza para cachorro',
    imageUrl: '/src/assets/receita4.png',
    ingredients: [
      '1 copo de aveia',
      '½ xícara de caldo de galinha/carne',
      '2 ovos',
      '¼ xícara de óleo vegetal',
      '2 xícaras de farinha sem glúten',
      '1 banana',
      '¼ de xícara de queijo sem gordura ralado',
      '1 xícara de suco de beterraba misturado com Iogurte natural'
    ],
    instructions: [
      'Em uma tigela grande, misture a aveia, o caldo, os ovos e a farinha até obter uma massa.',
      'Se a massa ficar levemente pegajosa, adicione pequenas quantidades de farinha para corrigir o ponto.',
      'Despeje um pouco de farinha em uma superfície e trabalhe a massa com um rolo até o formato desejado.',
      'Coloque o suco de beterraba com iogurte sobre a base da massa, como um molho de tomate.',
      'Despeje o queijo sem gordura sobre a massa.',
      'Coloque as fatias de banana por cima, como se fossem pepperoni.',
      'Leve a pizza ao forno pré-aquecido a 200°C por 8 minutos.'
    ]
  }
];

