# Duplik

Compagnon PWA mobile pour les manches de narration et de correction de Duplik. Les images extraites du PDF fourni et leurs critères restent dans l’ordre du jeu ; les colonnes de cartes ont été rapprochées en inversant gauche et droite.

## Lancer en local

Servir le dossier avec un serveur HTTP local (le service worker ne fonctionne pas depuis `file://`) :

```sh
python3 -m http.server 4173
```

Ouvrir ensuite `http://localhost:4173`. Pour l’installation sur téléphone, publier le dossier sur une adresse HTTPS puis choisir « Ajouter à l’écran d’accueil » dans le navigateur. Les service workers PWA ne sont pas activés sur une adresse HTTP du réseau local.

La partie fonctionne hors ligne après le premier chargement. Les noms de joueurs sont enregistrés sur l’appareil ; le paquet de 26 scènes est mélangé et chaque carte apparaît une fois avant le prochain mélange.
