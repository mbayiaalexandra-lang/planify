"use client";

import { useState } from "react";
import { Header } from "../../../components/Header";
import { supabaseBrowser } from "../../../lib/supabase-browser";

export default function ProSignup() {
  const supabase = supabaseBrowser();

  const [nomSalon, setNomSalon] = useState("");
  const [responsable, setResponsable] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [commune, setCommune] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { data: pro, error: proError } = await supabase
      .from("professionnels")
      .insert([
        {
          nom_responsable: responsable,
          telephone,
          email,
        },
      ])
      .select()
      .single();

    if (proError) {
      alert(proError.message);
      return;
    }

    const { error: salonError } = await supabase.from("salons").insert([
      {
        professionnel_id: pro.id,
        nom: nomSalon,
        commune,
        adresse,
        description,
      },
    ]);

    if (salonError) {
      alert(salonError.message);
    } else {
      alert("Activité professionnelle enregistrée avec succès !");
    }
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Enregistrer mon activité</h1>
          <p>Ajoutez votre salon ou service à domicile sur Planify.</p>

          <form onSubmit={handleSubmit}>
            <input placeholder="Nom du salon ou activité" value={nomSalon} onChange={(e) => setNomSalon(e.target.value)} />
            <input placeholder="Nom du responsable" value={responsable} onChange={(e) => setResponsable(e.target.value)} />
            <input placeholder="Téléphone professionnel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            <input placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Commune / quartier" value={commune} onChange={(e) => setCommune(e.target.value)} />
            <input placeholder="Adresse complète" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            <textarea placeholder="Description de votre activité" value={description} onChange={(e) => setDescription(e.target.value)} />

            <button type="submit">Enregistrer mon activité</button>
          </form>
        </div>
      </section>
    </main>
  );
}