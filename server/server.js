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

// Redirection HTTP vers HTTPS
app.use((req, res, next) => {
  if (req.protocol === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

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

// Lancer un serveur HTTP (port 80) pour rediriger vers HTTPS
const http = require("http");
http.createServer(app).listen(3001, '0.0.0.0', () => {
  console.log(`HTTP Server listening on http://0.0.0.0:3001`);
});
