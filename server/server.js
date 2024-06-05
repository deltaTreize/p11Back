const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");
const { updateOperationsByName } = require('./operationUpdate');
const vercelRegex = /^https:\/\/.*\.vercel\.app$/;


dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
dbConnection();
// updateOperationsByName();


// Handle CORS issues
app.use(cors({
  origin: (origin, callback) => {
    if (origin === 'http://localhost:3000' || vercelRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Request payload middleware
app.use(express.json( ));
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

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
