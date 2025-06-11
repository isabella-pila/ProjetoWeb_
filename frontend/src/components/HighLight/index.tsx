
import { SHighLight } from "./styles";

export function HighLight({ href, title, src }: { href: string, title: string, src: string }){
    return(
        <SHighLight>
  <section>
    <a href={href}>
      <h3>{title}</h3>
      <img src={src} alt={`Imagem Receita ${title}`} />
    </a>
  </section>
   </SHighLight>
);
}
