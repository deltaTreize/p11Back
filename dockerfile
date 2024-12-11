# Étape 1 : Utiliser une image Node.js officielle
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3 : Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install --production

# Étape 5 : Copier tout le contenu de votre projet dans le conteneur
COPY . .

# Étape 6 : Exposer le port sur lequel votre application écoute
EXPOSE 3001

# Étape 7 : Définir la commande pour démarrer l'application
CMD ["npm", "run", "server"]
