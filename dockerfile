# Utilise une image de base officielle Node.js
FROM node:16

# Crée un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de ton application dans le conteneur
COPY . .

# Installe les dépendances
RUN npm install

# Expose le port 3001
EXPOSE 3001

# Lancer l'application
CMD ["npm", "run", "server"]
