const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");
const { updateOperationsByName } = require('./operationUpdate');
const vercelRegex = /^https:\/\/.*\.vercel\.app$/;
const https = require("https");
const fs = require("fs");

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
dbConnection();
// updateOperationsByName();

// Convertir ADRESS_AUTORISED en tableau
const allowedOrigins = process.env.ADRESS_AUTORISED.split(',');

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

// Request payload middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// API Documentation
// if (process.env.NODE_ENV !== "production") {
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// }

app.get("/", (req, res) => {
  res.send(`Server listening on port ${PORT}`);
});

// Charger les certificats SSL
const privateKey = fs.readFileSync("/etc/letsencrypt/live/ludovic-leblond.fr/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/ludovic-leblond.fr/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/ludovic-leblond.fr/chain.pem", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Lancer un serveur HTTPS sur le port 443
https.createServer(credentials, app).listen(443, () => {
  console.log(`Server listening on https://localhost:443`);
});
