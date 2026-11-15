# CloneIt

Mobile PWA for a draw, describe, compare and score party game. The 26 supplied illustrations and their criteria are included in the app.

## Lancer en local

Servir le dossier avec un serveur HTTP local (le service worker ne fonctionne pas depuis `file://`) :

```sh
python3 -m http.server 4173 --directory dist
```

Ouvrir ensuite `http://localhost:4173`. Pour l’installation sur téléphone, publier le dossier sur une adresse HTTPS puis choisir « Ajouter à l’écran d’accueil » dans le navigateur. Les service workers PWA ne sont pas activés sur une adresse HTTP du réseau local.

La partie fonctionne hors ligne après le premier chargement. Le paquet de 26 scènes est mélangé et chaque carte apparaît une fois avant le prochain mélange.
