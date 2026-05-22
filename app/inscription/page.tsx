import { Header } from "../../components/Header";
import Link from "next/link";

export default function InscriptionPage() {
  return (
    <main>
      <Header />

      <section className="profile-page">
        <p>Bienvenue sur Planify</p>
        <h1>Choisissez votre profil</h1>
        <p>
          Créez votre compte pour réserver un service beauté ou développer votre activité professionnelle.
        </p>

        <div className="profile-grid">
          <div className="profile-card">
            <h2>Je suis client</h2>
            <p>Recherchez des salons, prestataires à domicile, disponibilités et réservez facilement.</p>

            <Link href="/inscription/client">
              <button>Créer mon compte client</button>
            </Link>
          </div>

          <div className="profile-card">
            <h2>Je suis professionnel</h2>
            <p>Enregistrez votre salon ou votre activité indépendante et recevez des réservations.</p>

            <Link href="/inscription/professionnel">
              <button>Enregistrer mon activité</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
