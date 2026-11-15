# CloneIt

PWA mobile pour décrire une image, dessiner sur papier et comparer les détails.

- 26 cartes classiques : 5 critères, 90 secondes.
- Images personnelles : photos/fichiers, collage, glisser-déposer, liens d’images lorsque le site source autorise leur chargement.
- Génération IA de 3 à 10 critères objectifs. La durée des cartes personnelles s’adapte : 3 → 30 s, 5 → 45 s, 10 → 90 s. Le nombre de critères et la durée sont annoncés avant chaque manche.
- Modes Classiques, Mes images et Mélange ; seuls les critères enregistrés sont utilisés pendant la partie.
- Une collection partagée par organisateur. Depuis « Mes images », le bouton d’invitation crée un lien pour les autres téléphones. Les invités ajoutent leurs images sans compte et ne voient que leurs propres contributions. La bibliothèque de l’organisateur se synchronise toutes les 15 secondes.
- Les originaux restent disponibles hors ligne après un premier chargement. L’analyse et les nouvelles contributions partagées nécessitent Internet.

## Développement et publication

```sh
npm test
npm run build
```

Le build sans dépendances produit un Worker ESM autonome dans `dist/server/index.js`, avec les ressources de la PWA embarquées. `.openai/hosting.json` conserve l’identité GPT Sites et déclare le stockage R2 `BUCKET` pour les images et les cartes partagées. Aucun compte ChatGPT n’est nécessaire pour jouer ou contribuer.

Déclarer `GEMINI_API_KEY` comme **secret GPT Sites**, jamais dans le code ni le navigateur. Utiliser un projet Google AI Studio en Free Tier, sans compte de facturation lié, puis définir `GEMINI_FREE_TIER_CONFIRMED=true`. Le modèle est fixé à `gemini-3.5-flash-lite`, sans bascule vers un fournisseur payant. `.env.example` documente les noms seulement. Si l’IA est indisponible, les images importées restent sauvegardées, et l’éditeur permet de compléter les critères sans inventer une analyse.

Le serveur valide les images, les sessions anonymes signées et l’origine des requêtes d’analyse. Les invitations et les autorisations d’édition utilisent des jetons aléatoires distincts, hachés côté stockage ; le lien d’invitation place son jeton dans le fragment du navigateur. Une invitation permet d’ajouter des images, mais ne donne pas accès à la liste des contributions des autres joueurs. Une collection accepte au maximum 50 images.

Les limites IA par IP et globales sont des protections temporaires par instance Worker. Le quota gratuit Google est la limite de référence : l’application s’arrête si ce quota est atteint. Ne pas activer la facturation du projet Google. Les photos sont envoyées à Google uniquement lors de leur analyse ; l’utilisation des données suit les conditions du palier gratuit Gemini. Les liens d’images sont chargés par le navigateur, sans proxy de téléchargement arbitraire côté serveur.

## Configuration privée de Gemini

La page `/setup#setup=<jeton privé>` permet à l’organisateur de saisir sa clé sans passer par le chat ni par GitHub. Le serveur vérifie ce jeton contre `SETUP_TOKEN_HASH` (secret Sites), valide la clé par une lecture des métadonnées du modèle Gemini, puis l’enregistre chiffrée en AES-GCM dans R2. `KEY_VAULT_SECRET` est la clé de chiffrement, également conservée comme secret Sites. La configuration se verrouille dès le premier enregistrement et la clé n’est jamais renvoyée au navigateur. La confirmation du projet Free Tier sans facturation est obligatoire. Les secrets de configuration ne sont jamais inclus dans l’archive de publication.
