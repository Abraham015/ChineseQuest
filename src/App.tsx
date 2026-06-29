import { useMemo, useState } from "react";
import { sections } from "./data/navigation";
import { vocabularyCards } from "./data/vocabularyCards";
import AccountPage from "./pages/AccountPage";
import GrammarPage from "./pages/GrammarPage";
import HelpPage from "./pages/HelpPage";
import VocabularyPage from "./pages/VocabularyPage";
import type { Section } from "./types/navigation";
import { announce } from "./utils/announce";
import { useSupabaseAccount } from "./hooks/useSupabaseAccount";

export default function App() {
  const account = useSupabaseAccount();
  const [activeSection, setActiveSection] = useState<Section>("grammar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return vocabularyCards.filter((card) =>
      `${card.hanzi} ${card.pinyin} ${card.meaning} ${card.tag}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  function changeSection(section: Section) {
    setActiveSection(section);
    setMenuOpen(false);
    setQuery("");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">中</span>
          <div>
            <strong>ChineseQuest</strong>
          </div>
        </div>

        <nav aria-label="Secciones principales">
          {sections.map((section) => (
            <button
              key={section.id}
              className={activeSection === section.id ? "active" : ""}
              onClick={() => changeSection(section.id)}
            >
              <span>{section.label}</span>
              <small>{section.hint}</small>
            </button>
          ))}
        </nav>
      </aside>

      {menuOpen && <button className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Cerrar menu" />}

      <main>
        <header>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">☰</button>
          <label className="search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar hanzi, pinyin o significado..."
            />
          </label>
          <AccountHeaderButton onOpen={() => changeSection("account")} />

          {searchResults.length > 0 && (
            <div className="search-popover">
              {searchResults.map((card) => (
                <button
                  key={card.hanzi}
                  onClick={() => {
                    changeSection("vocabulary");
                    void announce("Resultado encontrado", `${card.hanzi} significa ${card.meaning}.`, "success");
                  }}
                >
                  <strong>{card.hanzi}</strong>
                  <span>{card.pinyin} · {card.meaning}</span>
                </button>
              ))}
            </div>
          )}
        </header>

        {activeSection === "grammar" && <GrammarPage />}
        {activeSection === "vocabulary" && <VocabularyPage isSignedIn={account.isSignedIn} onGoToAccount={() => changeSection("account")} />}
        {activeSection === "account" && <AccountPage />}
        {activeSection === "help" && <HelpPage />}
      </main>
    </div>
  );
}

function AccountHeaderButton({ onOpen }: { onOpen: () => void }) {
  const { displayName, isConfigured, isLoading, isSignedIn, signOut } = useSupabaseAccount();

  if (!isConfigured) {
    return <button className="account-pill" onClick={onOpen}>Supabase sin configurar</button>;
  }

  if (!isSignedIn) {
    return <button className="account-pill" onClick={onOpen} disabled={isLoading}>Iniciar sesion</button>;
  }

  return (
    <div className="account-header">
      <button className="account-pill" onClick={onOpen}>{displayName || "Cuenta"}</button>
      <button className="account-signout" onClick={() => void signOut()} disabled={isLoading}>Salir</button>
    </div>
  );
}
