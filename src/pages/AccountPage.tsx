import { useEffect, useState, type FormEvent } from "react";
import Swal from "sweetalert2";
import { useSupabaseAccount } from "../hooks/useSupabaseAccount";

type AuthMode = "sign-in" | "sign-up";

export default function AccountPage() {
  const account = useSupabaseAccount();
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [authEmail, setAuthEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showSignUpOption, setShowSignUpOption] = useState(false);

  useEffect(() => {
    setName(account.displayName || "");
    setNewEmail(account.email || "");
  }, [account.displayName, account.email]);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    if (!authEmail.trim() || !password) return;

    const result = await account.signIn(authEmail, password);

    if (!result.ok) {
      setShowSignUpOption(true);
      await Swal.fire({
        icon: "error",
        title: "No se pudo iniciar sesion",
        text: result.message,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#b91c1c",
      });
      return;
    }

    setShowSignUpOption(false);
    setPassword("");
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!authEmail.trim() || !password || !name.trim()) return;

    const result = await account.signUp(authEmail, password, name);

    await Swal.fire({
      icon: result.ok ? "success" : "error",
      title: result.ok ? "Cuenta creada" : "No se pudo crear la cuenta",
      text: result.message,
      confirmButtonText: "Entendido",
      confirmButtonColor: "#b91c1c",
    });

    if (!result.ok) return;

    setAuthMode("sign-in");
    setShowSignUpOption(false);
    setPassword("");
  }

  async function handleDisplayName(event: FormEvent) {
    event.preventDefault();

    if (!name.trim()) return;

    const result = await account.updateDisplayName(name);

    await Swal.fire({
      icon: result.ok ? "success" : "error",
      title: result.ok ? "Nombre actualizado" : "No se pudo actualizar",
      text: result.message,
      confirmButtonText: "Entendido",
      confirmButtonColor: "#b91c1c",
    });
  }

  async function handleEmail(event: FormEvent) {
    event.preventDefault();

    if (!newEmail.trim() || newEmail === account.email) return;

    const result = await account.updateEmail(newEmail);

    await Swal.fire({
      icon: result.ok ? "success" : "error",
      title: result.ok ? "Revisa tu correo" : "No se pudo cambiar el email",
      text: result.message,
      confirmButtonText: "Entendido",
      confirmButtonColor: "#b91c1c",
    });
  }

  if (!account.isConfigured) {
    return (
      <div className="page account-page">
        <section className="account-panel">
          <h1>Cuenta</h1>
          <p>Supabase no esta configurado. Revisa las variables de entorno de ChineseQuest.</p>
        </section>
      </div>
    );
  }

  if (!account.isSignedIn) {
    return (
      <div className="page account-page">
        <section className="account-panel account-auth-panel">
          <h1>{authMode === "sign-in" ? "Iniciar sesion" : "Crear cuenta"}</h1>
          <p>{authMode === "sign-in" ? "Entra para ver tus carpetas de vocabulario." : "Crea tu cuenta para guardar tus carpetas en Supabase."}</p>

          <form className="account-form" onSubmit={authMode === "sign-in" ? handleSignIn : handleSignUp}>
            {authMode === "sign-up" && (
              <label>
                Nombre
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" />
              </label>
            )}

            <label>
              Email
              <input type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="tu@email.com" />
            </label>
            <label>
              Contrasena
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimo 6 caracteres" />
            </label>

            <div className="account-actions">
              <button className="primary" disabled={account.isLoading}>
                {authMode === "sign-in" ? "Entrar" : "Crear cuenta"}
              </button>

              {authMode === "sign-in" && showSignUpOption && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setAuthMode("sign-up");
                    setShowSignUpOption(false);
                  }}
                  disabled={account.isLoading}
                >
                  Crear cuenta
                </button>
              )}

              {authMode === "sign-up" && (
                <button type="button" className="secondary-button" onClick={() => setAuthMode("sign-in")} disabled={account.isLoading}>
                  Ya tengo cuenta
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="page account-page">
      <section className="account-overview">
        <div>
          <span className="account-kicker">Panel personal</span>
          <h1>Tu cuenta</h1>
          <p>Administra tu perfil y la sesion de ChineseQuest.</p>
        </div>
        <button type="button" className="secondary-button" onClick={() => void account.signOut()} disabled={account.isLoading}>
          Cerrar sesion
        </button>
      </section>

      <section className="account-stats" aria-label="Resumen de cuenta">
        <article><span>Carpetas</span><strong>0</strong><small>Disponibles despues</small></article>
        <article><span>Tarjetas</span><strong>0</strong><small>Vocabulario personal</small></article>
        <article><span>Sincronizacion</span><strong>Activa</strong><small>Supabase conectado</small></article>
        <article><span>Seguridad</span><strong>30 min</strong><small>Cierre por inactividad</small></article>
      </section>

      <section className="account-settings-grid">
        <div className="account-panel">
          <h2>Perfil</h2>
          <p>Este nombre se muestra en el boton de cuenta de la cabecera.</p>
          <form className="account-form" onSubmit={handleDisplayName}>
            <label>
              Nombre visible
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" />
            </label>
            <button className="primary" disabled={account.isLoading}>Guardar nombre</button>
          </form>
        </div>

        <div className="account-panel">
          <h2>Correo de acceso</h2>
          <p>Supabase enviara una confirmacion antes de aplicar el cambio.</p>
          <form className="account-form" onSubmit={handleEmail}>
            <label>
              Correo
              <input type="email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="nuevo@email.com" />
            </label>
            <button className="primary" disabled={account.isLoading || newEmail === account.email}>Cambiar email</button>
          </form>
        </div>
      </section>
    </div>
  );
}
