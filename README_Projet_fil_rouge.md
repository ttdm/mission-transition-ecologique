# QuickStart :

1/ Installer nvm :
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

2/ Installer les packets du projet :
npm ci = clean install permet d'avoir exactement les mêmes dépendances

et le projet est fonctionnel.

Tu peux voir le site en executant la commande `npm run dev` et en allant à l'adresse http://localhost:4242/

Dès que tu enregistre un fichier, le serveur de développement le prend en compte et tes modifications sont visibles sur le localhost.

# Autres commandes qui te seront utiles

J'ai utilisé la commande `npm run generate:projects` pour vérifier que le lien avec baserow est fonctionnel.
Tu peux te servir de cette commande pour voir comment fonctionne le lien avec baserow.
Tu trouvera aussi de nombreuses infos pour cela sur : https://baserow.io/api-docs/
