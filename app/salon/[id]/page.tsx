import { Header } from "../../../components/Header";
import { supabaseServer } from "../../../lib/supabase-server";

export default async function SalonPage({ params }: any) {
  const { id } = await params;
  const supabase = await supabaseServer();

  const { data: salon } = await supabase
    .from("salons")
    .select("*")
    .eq("id", id)
    .single();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("salon_id", id)
    .order("prix", { ascending: true });

  if (!salon) {
    return <p>Salon introuvable</p>;
  }

  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>{salon.nom}</h1>
          <p>{salon.commune}</p>
          <p>{salon.adresse}</p>
          <p>{salon.description}</p>

          <h2 style={{ marginTop: "32px" }}>Services disponibles</h2>

          {services?.map((service) => (
            <div key={service.id} className="service-row">
              <div className="service-left">
                <h3>{service.nom}</h3>
                <p>Service beauté professionnel</p>
                <div className="service-meta">
                  à partir de {service.prix} FCFA • {service.duree_minutes} min
                </div>
              </div>

              <div className="service-right">
                <a href={`/reservation?salon=${salon.id}&service=${service.id}`}>
  <button className="service-button">Choisir</button>
</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}