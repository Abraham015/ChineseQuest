import { announce } from "../utils/announce";

const steps = [
  ["1", "Entra a Gramatica para revisar patrones y ejemplos."],
  ["2", "Abre Vocabulario para estudiar hanzi, pinyin y significado."],
  ["3", "Usa la busqueda superior para saltar directo a una palabra."],
  ["4", "La seccion Cuenta queda preparada para autenticacion futura."],
];

export default function HelpPage() {
  return (
    <div className="page help-page">
      <section className="help-hero">
        <div>
          <span className="eyebrow">GUIA</span>
          <h1>Como usar ChineseQuest</h1>
          <p>Una interfaz inicial para estudiar mandarin por secciones, con acciones claras y avisos visuales.</p>
        </div>
        <div className="help-example-card">
          <span>Ejemplo</span>
          <strong>朋友</strong>
          <p>peng you · amigo</p>
        </div>
      </section>

      <section className="help-steps">
        {steps.map(([number, text]) => (
          <article key={number}>
            <span>{number}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="help-section">
        <h2>Anuncios</h2>
        <p>Los botones de practica, detalle y cuenta usan SweetAlert2 como base para mensajes de estado.</p>
        <button className="primary" onClick={() => void announce("SweetAlert2 activo", "Los anuncios ya estan funcionando.", "success")}>
          Probar anuncio
        </button>
      </section>
    </div>
  );
}
