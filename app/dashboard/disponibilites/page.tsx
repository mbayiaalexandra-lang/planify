"use client";

import { useState } from "react";
import { Header } from "../../../components/Header";
import { supabaseBrowser } from "../../../lib/supabase-browser";

export default function DisponibilitesPage() {
  const supabase = supabaseBrowser();

  const [salonId, setSalonId] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");

  async function ajouterDisponibilite(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("disponibilites").insert([
      {
        salon_id: salonId,
        date_disponible: date,
        heure,
        disponible: true,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Disponibilité ajoutée !");
      setHeure("");
    }
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Mes disponibilités</h1>
          <p>Ajoutez les créneaux disponibles pour votre salon.</p>

          <form onSubmit={ajouterDisponibilite}>
            <input
              placeholder="ID du salon"
              value={salonId}
              onChange={(e) => setSalonId(e.target.value)}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
            />

            <button type="submit">Ajouter la disponibilité</button>
          </form>
        </div>
      </section>
    </main>
  );
}