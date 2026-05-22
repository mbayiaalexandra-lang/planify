import { Header } from "../../components/Header";

export default function DashboardPage() {
  return (
    <main>
      <Header />

      <section className="form-page">
        <div className="form-card">
          <h1>Dashboard professionnel</h1>
          <p>Bienvenue dans votre espace Planify.</p>

          <a href="/dashboard/disponibilites">
            <button>Gérer mes disponibilités</button>
          </a>
        </div>
      </section>
    </main>
  );
}