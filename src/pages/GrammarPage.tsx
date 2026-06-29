import { grammarTopics } from "../data/grammarTopics";

export default function GrammarPage() {
  return (
    <div className="page">
      <section className="section-heading">
        <div>
          <span className="eyebrow dark">GRAMATICA</span>
          <h2>Temas destacados</h2>
        </div>
      </section>

      <section className="topic-grid">
        {grammarTopics.map((topic) => (
          <article className="topic-card" key={topic.title}>
            <span>{topic.level}</span>
            <h3>{topic.title}</h3>
            <strong>{topic.example}</strong>
            <p>{topic.translation}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
