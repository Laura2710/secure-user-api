# Secure User API 🔐

API REST simple et sécurisée pour la gestion des utilisateurs  
(inscription, authentification, routes protégées).

## Fonctionnalités

- Inscription utilisateur (register)
- Connexion utilisateur (login)
- Hash des mots de passe avec Argon2
- Authentification via JWT
- Route protégée (`/auth/me`)
- Gestion centralisée des erreurs
- Validation des entrées
- Architecture claire (controller / service / middleware)

## Stack technique

- **Node.js**
- **TypeScript**
- **Express**
- **ORM Prisma**
- **SQLite**
- **Argon2**
- **JWT**

## 📁 Architecture du projet

```
src/
├── controllers/
├── services/
├── middlewares/
├── prisma/
├── validators/
├── utils/
├── errors/
├── routes/
├── app.ts
└── server.ts
```

## Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/Laura2710/secure-user-api.git
cd secure-user-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d’environnement

Créer un fichier .env à la racine :

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="VOTRE_CLE_SECRETE"
```

### 4. Initialiser la base de données

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Lancer le serveur

```bash
npm run dev
```

Le serveur démarre sur http://localhost:3000.

## Documentation API

Pour obtenir une documentation interactive, rendez-vous sur [Swagger](http://localhost:3000/docs).
Elle permet de tester les endpoints et de visualiser les schémas de requêtes/réponses.
