"use client";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { supabaseBrowser } from "../../lib/supabase-browser";

export default function ConfirmationPage() {
  const supabase = supabaseBrowser();

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    async function loadService() {
      const params = new URLSearchParams(window.location.search);
      const serviceId = params.get("service");

      if (!serviceId) return;

      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .single();

      setService(data);
    }

    loadService();
  }, []);

  const montantTotal = service?.prix || 0;
  const acompte = Math.round(montantTotal * 0.2);

  async function confirmerReservation(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);

    const salonId = params.get("salon");
    const serviceId = params.get("service");
    const disponibiliteId = params.get("disponibilite");

    if (!salonId || !serviceId || !disponibiliteId) {
      alert("Informations de réservation manquantes.");
      return;
    }

    const { data: dispo, error: dispoError } = await supabase
      .from("disponibilites")
      .select("*")
      .eq("id", disponibiliteId)
      .single();

    if (dispoError || !dispo) {
      alert("Disponibilité introuvable.");
      return;
    }

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .insert([
        {
          nom,
          prenom: "",
          telephone,
          email,
        },
      ])
      .select()
      .single();

    if (clientError) {
      alert(clientError.message);
      return;
    }

    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .insert([
        {
          client_id: client.id,
          salon_id: salonId,
          service_id: serviceId,
          date_reservation: dispo.date_disponible,
          heure_reservation: dispo.heure,
          statut: "en_attente_paiement",
          montant_total: montantTotal,
          acompte: acompte,
          statut_paiement: "en_attente",
        },
      ])
      .select()
      .single();

    if (reservationError) {
      alert(reservationError.message);
      return;
    }

    const { data: paiement, error: paiementError } = await supabase
  .from("paiements")
  .insert([
    {
      reservation_id: reservation.id,
      montant: acompte,
      devise: "XOF",
      moyen: "mobile_money_ou_carte",
      statut: "en_attente",
    },
  ])
  .select()
  .single();

    if (paiementError) {
      alert(paiementError.message);
      return;
    }

    window.location.href = `/paiement?paiement=${paiement.id}`;
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Confirmer votre réservation</h1>

          {service && (
            <div className="booking-card">
              <h3>{service.nom}</h3>
              <p>Prix total : {montantTotal} FCFA</p>
              <p>Acompte obligatoire : {acompte} FCFA</p>
            </div>
          )}

          <form onSubmit={confirmerReservation}>
            <input
              placeholder="Nom complet"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
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
              Payer l’acompte et confirmer
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}