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
const allowedOrigins = [
  "http://localhost:3000",  // Localhost (pour le développement)
  "https://p11-three.vercel.app",  // Frontend sur Vercel
  // Ajoute d'autres origins autorisées si nécessaire
];

// Configuration CORS
app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS Origin:", origin);  // Journalisation pour debug
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Accepter l'origine
    } else {
      callback(new Error('Not allowed by CORS'));  // Refuser l'origine
    }
  }
}));

// Rediriger HTTP vers HTTPS
app.use((req, res, next) => {
  if (req.protocol === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send(`Server listening on port ${PORT}`);
});

// Lancer un serveur HTTP (port 80)
const http = require("http");
http.createServer(app).listen(PORT, () => {
  console.log(`HTTP Server listening on http://localhost:${PORT}`);
});
