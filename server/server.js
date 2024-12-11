const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à la base de données
dbConnection();

// Charger les origines autorisées à partir de l'environnement
const allowedOrigins = process.env.ADRESS_AUTORISED.split(',');

// Configuration de CORS pour accepter les origines spécifiées dans le .env
app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS Origin:", origin); // Journalisation pour debug
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Accepter l'origine
    } else {
      callback(new Error('Not allowed by CORS')); // Refuser l'origine
    }
  }
}));

// Middleware pour gérer le payload des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Définir les routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// Documentation de l'API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send(`Server listening on port ${PORT}`);
});

// Lancer un serveur (Node.js va écouter sur le port 3001)
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
