# Newsroom  — API GraphQL (variante backend)
<!-- test webhook n8n -->
Ce backend est une **implémentation alternative en GraphQL** du même domaine métier que l'API REST Newsroom (mêmes entités : utilisateurs, articles, médias, agenda, veille info, etc.), construite avec **NestJS + GraphQL (Apollo Server)** au lieu de contrôleurs REST.

> ℹ️ **Positionnement par rapport à l'API REST documentée précédemment :** ce projet couvre le même modèle de données mais dans une version plus proche d'un scaffold généré (`nest generate resource`) : CRUD complet sur chaque entité, sans couche d'authentification, de hachage de mot de passe, ni logique d'appel réel à un modèle d'IA. Il semble s'agir d'une base de départ ou d'une variante d'architecture explorée en parallèle de l'API REST, plutôt que du backend actuellement branché à l'application mobile (qui consomme les URLs REST `newsroom-ai-api-u0vt.onrender.com/...`). À confirmer selon l'usage réel que tu veux en documenter dans le rapport.

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Schéma GraphQL](#schéma-graphql)
- [Modèle de données](#modèle-de-données)
- [Modules et opérations disponibles](#modules-et-opérations-disponibles)
- [Variables d'environnement](#variables-denvironnement)
- [Installation et démarrage](#installation-et-démarrage)
- [Différences notables avec l'API REST](#différences-notables-avec-lapi-rest)

## Stack technique

| Composant | Technologie |
|---|---|
| Framework | NestJS |
| API | GraphQL (`@nestjs/graphql`), pilote **Apollo Server** (`@nestjs/apollo`) |
| Base de données | PostgreSQL, via TypeORM (connexion principale + connexion de secours) |
| Tâches planifiées | `@nestjs/schedule` (module importé, prêt pour des jobs Cron) |
| Configuration | `@nestjs/config` |

## Architecture

Comme l'API REST, chaque domaine métier est un **module NestJS** autonome, mais ici structuré autour d'un **resolver GraphQL** plutôt qu'un contrôleur HTTP :

```
src/
├── app.module.ts       # Connexions TypeORM (default + backup), GraphQLModule (Apollo, schéma auto-généré)
├── main.ts             # Bootstrap Nest (port 3000 par défaut)
├── schema.gql          # Schéma GraphQL généré automatiquement (ne pas modifier à la main)
├── users/               # Utilisateurs
├── role/                 # Rôles
├── articles/              # Articles
├── medias/                # Médias
├── agenda/                # Agenda éditorial
├── news-item/             # Veille info (actualités)
├── source/                # Sources d'information
├── revision/              # Relectures d'articles
├── notifications/         # Notifications
└── chatbot-ai/            # Historique des échanges avec l'assistant IA
```

Chaque module suit le même schéma : `*.module.ts`, `*.resolver.ts` (équivalent GraphQL d'un controller), `*.service.ts` (logique métier / TypeORM), un dossier `dto/` avec des `Input` types (`Create*Input`, `Update*Input` via `PartialType`), et `entities/*.entity.ts` (à la fois entité TypeORM et type GraphQL via les décorateurs `@ObjectType()`/`@Field()`).

Comme dans l'API REST, `app.module.ts` déclare **deux connexions PostgreSQL** (`default` et `backup`) avec `synchronize: true`, et importe `ScheduleModule` — bien qu'aucune tâche planifiée (`@Cron`) ne soit implémentée dans ce projet à ce stade.

## Schéma GraphQL

Le schéma est **généré automatiquement** (`autoSchemaFile`) dans `src/schema.gql` à partir des décorateurs `@ObjectType()`, `@Field()`, `@InputType()`, `@Resolver()`, `@Query()` et `@Mutation()` présents dans le code — ce fichier ne doit pas être édité manuellement, il est régénéré à chaque démarrage.

Une fois le serveur lancé, l'explorateur **Apollo Sandbox / GraphQL Playground** est disponible à la racine de l'API (`http://localhost:3000/graphql` en local) pour tester les requêtes et mutations interactivement.

## Modèle de données

Le modèle reprend les mêmes entités que l'API REST, avec quelques différences de détail :

| Entité | Champs clés | Relations |
|---|---|---|
| `User` | `nom`, `prenom`, `email` (unique), `motDePasse`, `statut`, `dateCreation` | `Role` (N:1), `Article`/`Media`/`Revision`/`Notification`/`ChatbotAi` (1:N) |
| `Role` | `nomRole` (enum `Roles`) | `User` (1:N) |
| `Article` | `titre`, `contenu`, `statut` (enum `ArticleStatus`, 9 valeurs), `categorie`, `tags[]`, `dateCreation`, `dateModification`, `datePublication` | `User` (auteur), `Media`/`Revision` (1:N), `NewsItem` (N:N) |
| `Media` | `type` (enum `MediaType`), `urlFichier`, `titre`, `description`, `localisation`, `dateCapture` | `Article`, `User` (N:1) |
| `Agenda` | `title`, `resume`, `categorie`, `importance`, `dateDebut`, `dateFin`, `lieu` | `Source` (N:1) |
| `NewsItem` | `titre`, `contenu`, `categorie` (enum `CategorieNews`), `url`, `datePublication` | `Source` (N:1), `Article` (N:N) |
| `Source` | `nom`, `url`, `type` (enum `TypeSource`), `fiable`, `logoUrl`, `pays`, `langue` | `NewsItem` (1:N) |
| `Revision` | `dateRevision`, `commentaire` | `User`, `Article` (N:1) |
| `Notification` | `message`, `type`, `lu`, `dateEnvoi` | `User` (N:1) |
| `ChatbotAi` | `question`, `resultat`, `dateAnalyse` | `User` (N:1) |

### Enum `ArticleStatus` (plus détaillé que dans l'API REST)

```
Brouillon → EnAttente → EnCoursDeValidation → Valide → Publie
                              ↓
                          Refuse / Invalide
                              
                          Archive / Supprime (états terminaux)
```

## Modules et opérations disponibles

Chaque module expose le même schéma d'opérations CRUD :

| Module | Query (liste) | Query (détail) | Mutations |
|---|---|---|---|
| `users` | `users` | `user(id)` | `createUser`, `updateUser`, `removeUser` |
| `role` | `roles` | `role(id)` | `createRole`, `updateRole`, `removeRole` |
| `articles` | `articles` | `article(id)` | `createArticle`, `updateArticle`, `removeArticle` |
| `medias` | `medias` | `media(id)` | `createMedia`, `updateMedia`, `removeMedia` |
| `agenda` | `agendas` | `agenda(id)` | `createAgenda`, `updateAgenda`, `removeAgenda` |
| `news-item` | `newsItems` | `newsItem(id)` | `createNewsItem`, `updateNewsItem`, `removeNewsItem` |
| `source` | `sources` | `source(id)` | `createSource`, `updateSource`, `removeSource` |
| `revision` | `revisions` | `revision(id)` | `createRevision`, `updateRevision`, `removeRevision` |
| `notifications` | `notifications` | `notification(id)` | `createNotification`, `updateNotification`, `removeNotification` |
| `chatbot-ai` | `chatbotAis` | `chatbotAi(id)` | `createChatbotAi`, `updateChatbotAi`, `removeChatbotAi` |

Exemple de mutation pour créer un utilisateur :

```graphql
mutation {
  createUser(createUserInput: {
    nom: "Amrani"
    prenom: "Yosra"
    email: "yosra@example.com"
    motDePasse: "motdepasse"
    statut: "actif"
    roleId: 1
  }) {
    id
    email
  }
}
```

> Le module `chatbot-ai` ne fait, comme son équivalent REST `ia-analyse`, que **stocker et restituer l'historique des échanges** (question/réponse) : il n'existe aucun appel sortant vers un service d'IA générative (Gemini, OpenRouter, etc.) dans ce module — la génération de la réponse est supposée réalisée ailleurs (frontend ou service externe) avant d'être persistée ici.

## Variables d'environnement

| Variable | Description |
|---|---|
| `PORT` | Port d'écoute (défaut : `3000`) |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL principale |
| `BACKUP_DATABASE_URL` | Chaîne de connexion PostgreSQL de secours |
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` | Paramètres de connexion alternatifs si les URLs ne sont pas définies |

## Installation et démarrage

```bash
npm install
npm run start:dev
```

L'explorateur GraphQL est ensuite accessible sur `http://localhost:3000/graphql`.

## Différences notables avec l'API REST

Pour éviter toute confusion dans la documentation du PFE, voici les écarts constatés entre cette variante GraphQL et l'API REST déjà documentée :

- **Aucune authentification** : ni JWT, ni MSAL, ni hachage bcrypt du mot de passe — `motDePasse` est stocké et manipulé tel quel dans `UsersService`.
- **Aucun guard de rôle** : toutes les opérations sont accessibles sans restriction, contrairement au `RolesGuard` présent (partiellement) côté REST.
- **`ArticleStatus` plus riche** : 9 valeurs ici (`Brouillon`, `Publié`, `Archivé`, `En attente`, `Refusé`, `Supprimé`, `En cours de validation`, `Validé`, `Invalide`) contre 4 côté REST/frontend (`Brouillon`, `EnAttente`, `Valider`, `Publier`).
- **Champ `Agenda.title`** en anglais ici, contre `Agenda.titre` en français côté REST/frontend — incohérence de nommage à corriger si les deux API doivent un jour cohabiter ou fusionner.
- **`Roles` inclut `ADMIN`** explicitement dans l'enum ici, alors que l'enum équivalent côté REST/frontend ne liste que `CELLULE_VALIDATION`, `EQUIPE_MEDIA`, `JOURNALISTE` (le rôle admin y étant apparemment géré autrement).
- **Pas de sauvegarde automatique planifiée** : `ScheduleModule` est importé mais aucune tâche `@Cron` n'est définie dans ce projet, contrairement au `BackupService` de l'API REST.
