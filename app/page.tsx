import { Header } from "../components/Header";
import Map from "../components/Map";
import { supabaseServer } from "../lib/supabase-server";

export default async function Home() {
  const supabase = await supabaseServer();

  const { data: salons } = await supabase
    .from("salons")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main>
      <Header />

      <section className="hero">
        <div className="hero-content">
          <h1>Réservez des salons beauté et prestataires à domicile en Côte d’Ivoire</h1>
          <p>
            Coiffure, barber, maquillage, onglerie, soins et beauté à domicile —
            trouvez un professionnel près de chez vous et réservez instantanément.
          </p>

          <div className="search-box">
            <input placeholder="Quel service recherchez-vous ?" />
            <input placeholder="Ville ou quartier" />
            <button>Rechercher</button>
          </div>
        </div>
      </section>

      <section className="salons">
        <h2>Professionnels disponibles</h2>

        <div className="cards">
          {salons?.map((salon) => (
            <div className="card" key={salon.id}>
              <h3>{salon.nom}</h3>
              <p>{salon.commune}</p>
              <p>{salon.adresse}</p>
              <strong>Service beauté</strong>
              <a href={`/salon/${salon.id}`}>
  <button>Réserver</button>
</a>
            </div>
          ))}
        </div>
      </section>

      <section className="salons">
        <h2>Voir les salons sur la carte</h2>
        <Map />
      </section>
    </main>
  );
}

