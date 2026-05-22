import { Header } from "../../components/Header";

export default function Inscription() {
  return (
    <main>
      <Header />

      <section className="signup-page">
        <div className="signup-header">
          <span>Bienvenue sur Planify</span>
          <h1>Choisissez votre profil</h1>
          <p>
            Créez votre compte pour réserver un service beauté ou développer
            votre activité professionnelle.
          </p>
        </div>

        <div className="signup-cards">
          <div className="signup-card">
            <div className="icon">👤</div>
            <h2>Je suis client</h2>
            <p>
              Recherchez des salons, prestataires à domicile, disponibilités et
              réservez facilement.
            </p>

            <form>
              <input placeholder="Nom" />
              <input placeholder="Prénom" />
              <input placeholder="Téléphone" />
              <input placeholder="Adresse mail" />
              <button>Créer mon compte client</button>
            </form>
          </div>

          <div className="signup-card dark">
            <div className="icon">💼</div>
            <h2>Je suis professionnel</h2>
            <p>
              Enregistrez votre salon ou votre activité indépendante et recevez
              des réservations.
            </p>

            <form>
              <input placeholder="Nom du salon ou activité" />
              <input placeholder="Nom du responsable" />
              <input placeholder="Téléphone professionnel" />
              <input placeholder="Adresse mail" />
              <input placeholder="Commune / quartier" />
              <button>Enregistrer mon activité</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
