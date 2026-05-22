import './globals.css';
export const metadata={title:'Beauté CI',description:'Réservation beauté en Côte d’Ivoire'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body><main className="max-w-6xl mx-auto p-6">{children}</main></body></html>}
