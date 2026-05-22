"use client";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { supabaseBrowser } from "../../lib/supabase-browser";

export default function PaiementPage() {
  const supabase = supabaseBrowser();

  const [paiement, setPaiement] = useState<any>(null);

  useEffect(() => {
    async function loadPaiement() {
      const params = new URLSearchParams(window.location.search);
      const paiementId = params.get("paiement");

      if (!paiementId) return;

      const { data } = await supabase
        .from("paiements")
        .select("*")
        .eq("id", paiementId)
        .single();

      setPaiement(data);
    }

    loadPaiement();
  }, []);

  async function confirmerPaiement() {
    if (!paiement) return;

    await supabase
      .from("paiements")
      .update({
        statut: "paye",
        moyen: "simulation",
      })
      .eq("id", paiement.id);

    await supabase
      .from("reservations")
      .update({
        statut: "confirmee",
        statut_paiement: "paye",
      })
      .eq("id", paiement.reservation_id);

    alert("Paiement confirmé. Réservation validée !");
    window.location.href = "/";
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Paiement de l’acompte</h1>

          {paiement ? (
            <>
              <p>Montant à payer : {paiement.montant} FCFA</p>
              <p>Moyen : Mobile Money ou carte bancaire</p>

              <button onClick={confirmerPaiement}>
                Simuler le paiement
              </button>
            </>
          ) : (
            <p>Paiement introuvable.</p>
          )}
        </div>
      </section>
    </main>
  );
}