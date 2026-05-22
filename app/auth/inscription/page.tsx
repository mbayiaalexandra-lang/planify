"use client";

import { useState } from "react";
import { Header } from "../../../components/Header";
import { supabaseBrowser } from "../../../lib/supabase-browser";

export default function AuthInscriptionPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function creerCompte(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Compte créé avec succès !");
      window.location.href = "/auth/connexion";
    }
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Créer un compte sécurisé</h1>
          <p>Créez votre accès avec email et mot de passe.</p>

          <form onSubmit={creerCompte}>
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

            <button type="submit">Créer mon compte</button>
          </form>
        </div>
      </section>
    </main>
  );
}