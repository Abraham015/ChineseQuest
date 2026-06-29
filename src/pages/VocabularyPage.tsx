import { announce } from "../utils/announce";

type Props = {
  isSignedIn: boolean;
  onGoToAccount: () => void;
};

export default function VocabularyPage({ isSignedIn, onGoToAccount }: Props) {
  if (!isSignedIn) {
    return (
      <div className="page">
        <section className="folder-hero">
          <div>
            <h1>Vocabulario</h1>
            <p>Inicia sesion para ver y administrar tus carpetas de vocabulario.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="folder-hero">
        <div>
          <span className="folder-level">VOCABULARIO</span>
          <h1>Vocabulario</h1>
          <p>Organiza tus palabras en carpetas personalizadas.</p>
        </div>
        <div className="folder-actions">
          <button
            className="primary"
            onClick={() => void announce("Nueva carpeta", "Aqui ira el formulario para crear carpetas de vocabulario.")}
          >
            + Carpeta
          </button>
        </div>
      </section>

      <section className="empty-folders">
        <span>Sin carpetas</span>
        <h2>Crea tu primera carpeta de vocabulario.</h2>
        <p>Las carpetas funcionaran como en DeutschQuest y KanaQuest: cada una podra contener tarjetas y modos de practica.</p>
      </section>
    </div>
  );
}
