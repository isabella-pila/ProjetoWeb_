import { DestaqueSection } from "./styles";

export function HighlightVideo() {
  return (
    <DestaqueSection>
        <section>
      <h3>Receitas saudáveis para o seu pet</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/v7YnV7Wr7pQ?si=ywH90S46gLGJ9zLa"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </section>
    </DestaqueSection>
  );
}
