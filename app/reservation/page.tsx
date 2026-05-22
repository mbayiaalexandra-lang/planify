import { Header } from "../../components/Header";
import { supabaseServer } from "../../lib/supabase-server";

export default async function ReservationPage({ searchParams }: any) {
  const { salon, service } = await searchParams;
  const supabase = await supabaseServer();

  const { data: serviceData } = await supabase
    .from("services")
    .select("*")
    .eq("id", service)
    .single();

  const { data: disponibilites } = await supabase
    .from("disponibilites")
    .select("*")
    .eq("salon_id", salon)
    .eq("disponible", true)
    .order("date_disponible", { ascending: true })
    .order("heure", { ascending: true });

  return (
    <main>
      <Header />

      <section className="pf-booking">
        <h1>Réservation</h1>

        <div className="pf-step">
          <span>1.</span>
          <h2>Prestation sélectionnée</h2>
        </div>

        <div className="pf-card">
          <h3>{serviceData?.nom}</h3>
          <p>{serviceData?.duree_minutes}min · à partir de {serviceData?.prix} FCFA</p>

          <select>
            <option>Avec qui ?</option>
            <option>Premier professionnel disponible</option>
          </select>
        </div>

        <button className="pf-add">Ajouter une prestation à la suite</button>

        <div className="pf-step">
          <span>2.</span>
          <h2>Choix de la date & heure</h2>
        </div>

        <div className="pf-card">
          <h3>Créneaux disponibles</h3>

          {disponibilites && disponibilites.length > 0 ? (
            <div className="pf-times">
              {disponibilites.map((dispo) => (
                <a
                  key={dispo.id}
                  href={`/confirmation?salon=${salon}&service=${service}&disponibilite=${dispo.id}`}
                >
                  <strong>{dispo.heure}</strong>
                  <small>{dispo.date_disponible}</small>
                </a>
              ))}
            </div>
          ) : (
            <p>Aucune disponibilité pour le moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}