import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          Planify
        </Link>

        <nav className="nav">
          <Link href="/">Accueil</Link>
          <Link href="/inscription">Inscription</Link>
          <Link href="/auth/connexion">Connexion</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}