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

// Connect to the database
dbConnection();

// Convertir ADRESS_AUTORISED en tableau
const allowedOrigins = process.env.ADRESS_AUTORISED.split(',');

// Gérer CORS
app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS Origin:", origin); // Journalisation pour debug
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Accepter l'origine
    } else {
      callback(new Error('Not allowed by CORS')); // Refuser
    }
  }
}));

// Middleware pour traiter le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes personnalisées
app.use("/api/v1/user", require("./routes/userRoutes"));

// Documentation de l'API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send(`Server listening on port ${PORT}`);
});

// Lancer un serveur HTTP (port 80)
app.listen(PORT, () => {
  console.log(`HTTP Server listening on http://localhost:${PORT}`);
});
