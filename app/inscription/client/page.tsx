"use client";

import { useState } from "react";
import { Header } from "../../../components/Header";
import { supabaseBrowser } from "../../../lib/supabase-browser";

export default function ClientSignup() {
  const supabase = supabaseBrowser();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("clients")
      .insert([
        {
          nom,
          prenom,
          telephone,
          email,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Compte client créé avec succès !");

      setNom("");
      setPrenom("");
      setTelephone("");
      setEmail("");
    }
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Créer un compte client</h1>

          <p>
            Réservez vos prestations beauté rapidement.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />

            <input
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />

            <input
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />

            <input
              placeholder="Adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              Créer mon compte
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
