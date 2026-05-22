"use client";

import { useState } from "react";
import { Header } from "../../../components/Header";
import { supabaseBrowser } from "../../../lib/supabase-browser";

export default function ConnexionPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function connexion(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Connexion</h1>

          <form onSubmit={connexion}>
            <input
              type="email"
              placeholder="Adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Se connecter</button>
          </form>
        </div>
      </section>
    </main>
  );
}