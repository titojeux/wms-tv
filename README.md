# Déploiement WMS TV sur Coolify

Ce guide déploie l'application **World Miracles Semences TV** sur votre VPS via **Coolify**, avec :

- Frontend React servi par nginx (port 80)
- Backend FastAPI (port 8001, interne uniquement)
- MongoDB (persistant via volume)
- nginx du frontend reverse-proxifie `/api/*` vers le backend → **une seule URL publique** `wms-tv.online`
- HTTPS automatique via Coolify (Let's Encrypt / Traefik)

---

## 1. Pré-requis

- Un VPS avec Coolify installé (`https://coolify.io`, minimum 2 GB RAM).
- Le domaine **wms-tv.online** avec un enregistrement DNS `A` (et optionnellement `www`) pointant sur l'IP publique du VPS.
- Un dépôt Git (GitHub / GitLab / Gitea) contenant tout ce code (dossier `/app` du projet).

---

## 2. Fichiers déjà présents dans le repo

Tout est prêt :

```
/backend/Dockerfile
/backend/.dockerignore
/frontend/Dockerfile
/frontend/nginx.conf
/frontend/.dockerignore
/docker-compose.yml
/.dockerignore
```

Poussez le tout sur votre dépôt Git.

---

## 3. Créer la ressource dans Coolify

1. **Coolify → Projects → New Project** (ex: `wms-tv`).
2. **New Resource → Docker Compose**.
3. Source :
   - Choisir votre dépôt Git (connectez GitHub/GitLab si besoin).
   - Branche : `main`
   - Base directory : `/` (racine)
   - Docker compose location : `/docker-compose.yml`
4. **Save**. Coolify parse automatiquement les services `mongo`, `backend`, `frontend`.

---

## 4. Variables d'environnement (dans Coolify → onglet Environment Variables)

| Clé | Valeur | Cible |
|---|---|---|
| `DB_NAME` | `wmstv` | mongo + backend |
| `CORS_ORIGINS` | `https://wms-tv.online,https://www.wms-tv.online` | backend |

> ⚠️ **NE PAS** définir `MONGO_URL` : il est déjà câblé dans le compose vers `mongodb://mongo:27017`.
> ⚠️ **NE PAS** définir `REACT_APP_BACKEND_URL` : il est volontairement vide → axios utilise `/api/…` en relatif (le proxy nginx fait le reste).

---

## 5. Domaine + HTTPS

1. Dans la ressource → **service `frontend`** → **Domains** :
   - Ajouter `https://wms-tv.online`
   - Ajouter `https://www.wms-tv.online`
2. Coolify génèrera automatiquement le certificat SSL (Let's Encrypt).
3. Le service `backend` **NE DOIT PAS** être exposé publiquement (laissez `expose: 8001` sans mapping de port ni domaine).

---

## 6. Volume MongoDB

Le volume `mongo_data` est déclaré dans le compose. Coolify le rendra persistant automatiquement.

📁 Vos programmes seront ré-injectés au premier démarrage (voir `seed_programs()` dans `server.py`).

---

## 7. Déploiement

- Cliquer **Deploy** dans Coolify.
- Suivre les logs live. Le premier build prend 3–6 minutes (yarn install + build React).
- Une fois `frontend healthy`, ouvrez `https://wms-tv.online` 🎉

---

## 8. Vérifications post-déploiement

```bash
# API en direct
curl -s https://wms-tv.online/api/channel | jq

# Grille des programmes
curl -s https://wms-tv.online/api/programs?day=Dimanche | jq
```

Le player live doit maintenant afficher le flux `restream.munokolive.com`.
Le bouton **Plein écran** fonctionnera nativement (permissions-policy OK sur votre domaine).

---

## 9. Mises à jour futures

- `git push` sur la branche `main` → Coolify déclenchera un redéploiement (si auto-deploy activé) ou cliquez **Redeploy**.
- Pour ajouter/modifier des programmes en direct : soit édition dans MongoDB (via Coolify → mongo → shell), soit implémentation d'un panneau admin (voir backlog PRD).

---

## 10. Backup MongoDB (recommandé)

Dans Coolify → mongo → **Backups** : activez un backup S3/Local hebdomadaire.

---

## 11. Prochaines étapes suggérées

- **Faire un don** : intégration Stripe / Mobile Money pour permettre le soutien financier de la chaîne (revenue clé pour un ministère 24/7).
- **Panneau admin** protégé (JWT) pour éditer la grille depuis l'interface, sans toucher au code.
- **PWA** : rendre le site installable sur mobile (icônes + service worker) pour une expérience "TV app".

Bon déploiement et que WMS TV touche les nations ! 🙌
