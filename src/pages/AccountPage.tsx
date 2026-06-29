import { useState, type FormEvent } from "react";
import { announce } from "../utils/announce";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitPlaceholder(event: FormEvent) {
    event.preventDefault();
    void announce(
      "Inicio de sesion pendiente",
      "El formulario ya esta preparado, pero todavia no tiene logica de autenticacion.",
    );
    setPassword("");
  }

  return (
    <div className="page account-page">
      <section className="account-overview">
        <div>
          <span className="account-kicker">Panel personal</span>
          <h1>Cuenta</h1>
          <p>Holder visual para iniciar sesion y preparar sincronizacion futura.</p>
        </div>
        <span className="status-pill">Modo local</span>
      </section>

      <section className="account-settings-grid">
        <div className="account-panel">
          <h2>Iniciar sesion</h2>
          <p>Este formulario no autentica todavia. Queda listo para conectar Supabase u otro proveedor despues.</p>
          <form className="account-form" onSubmit={submitPlaceholder}>
            <label>
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@email.com" />
            </label>
            <label>
              Contrasena
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimo 6 caracteres" />
            </label>
            <button className="primary">Entrar</button>
          </form>
        </div>

        <div className="account-panel account-note">
          <h2>Sincronizacion</h2>
          <p>Por ahora ChineseQuest funcionara como maqueta local. Los avisos de SweetAlert2 ya estan conectados para confirmar acciones y estados.</p>
          <button className="secondary-button" onClick={() => void announce("Cuenta local", "Aun no se guardan sesiones ni datos remotos.")}>
            Ver estado
          </button>
        </div>
      </section>
    </div>
  );
}
