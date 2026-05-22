# Beauté CI — MVP type Planity pour la Côte d’Ivoire

Fonctions incluses: marketplace salons, espace pro, création services, réservation anti-chevauchement, paiement CinetPay Mobile Money, webhook.

## Installation
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase
1. Crée un projet Supabase.
2. Copie `supabase/schema.sql` dans SQL Editor.
3. Mets `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local`.
4. Active Auth email OTP dans Supabase.

## Paiement CinetPay
Ajoute dans `.env.local`: `CINETPAY_API_KEY`, `CINETPAY_SITE_ID`, `CINETPAY_SECRET_KEY`.
Le webhook est `/api/cinetpay/notify`.

## À ajouter pour production
Validation webhook CinetPay côté serveur, SMS/WhatsApp, gestion horaires du salon, avis clients, multi-employés, commissions marketplace, back-office admin, KYC des pros.
