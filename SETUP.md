# Terodz — Guide de démarrage

## Prérequis
- Node.js 18+
- PostgreSQL (local ou Supabase/Neon)
- Compte Cloudinary (gratuit)
- Compte Resend (gratuit, pour les emails)

## 1. Configurer les variables d'environnement

Copiez `.env.example` en `.env.local` et remplissez les valeurs :

```bash
cp .env.example .env.local
```

Variables à configurer :
- `DATABASE_URL` — URL de connexion PostgreSQL
- `NEXTAUTH_SECRET` — Générez avec : `openssl rand -base64 32`
- `ADMIN_EMAIL` — Email du compte administrateur
- `ADMIN_PASSWORD` — Mot de passe admin (sera hashé au seeding)
- `RESEND_API_KEY` — Clé API Resend (https://resend.com)
- `OWNER_EMAIL` — Email qui reçoit les notifications de commandes
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `CURRENCY` — `DZD` ou `EUR`

## 2. Initialiser la base de données

```bash
# Pousser le schéma vers votre base PostgreSQL
npm run db:push

# Peupler avec les données initiales (produits + admin + fournée démo)
npm run db:seed
```

Le seed crée :
- 30 produits artisanaux répartis en 4 catégories
- Un compte admin avec les identifiants définis dans `.env.local`
- Une fournée démo en statut "ouverte"

## 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application est disponible sur http://localhost:3000

## 4. Accéder à l'administration

URL : http://localhost:3000/admin
Email et mot de passe : ceux définis dans `ADMIN_EMAIL` et `ADMIN_PASSWORD` dans `.env.local`

## Structure des pages

### Interface client
| URL | Description |
|-----|-------------|
| `/` | Page d'accueil |
| `/produits` | Catalogue complet (filtrable) |
| `/commander` | Formulaire de commande (fournée active) |
| `/confirmation` | Confirmation de commande |

### Administration
| URL | Description |
|-----|-------------|
| `/admin` | Tableau de bord |
| `/admin/fournees` | Gestion des fournées |
| `/admin/fournees/nouvelle` | Créer une fournée |
| `/admin/commandes` | Liste des commandes |
| `/admin/produits` | Gestion des produits |
| `/admin/clients` | Liste des clients |

## Déploiement sur Vercel

1. Créez un projet sur [vercel.com](https://vercel.com)
2. Configurez toutes les variables d'environnement dans le tableau de bord Vercel
3. Définissez la commande de build : `npm run build`
   (déjà configuré dans `package.json` : `prisma generate && next build`)
4. Pour la base de données, utilisez [Supabase](https://supabase.com) ou [Neon](https://neon.tech) — les deux sont compatibles avec Prisma
5. Pour les images, Cloudinary fonctionne directement sur Vercel

## Flux de commande (rappel)

1. Admin crée une fournée → assigne des produits → ouvre les commandes
2. Clients commandent via `/commander` → confirmation email automatique
3. Admin suit les commandes dans `/admin/commandes`
4. Admin marque les commandes "Prêtes" → email automatique au client
5. Admin ferme la fournée → livraison → marque "Livré"
