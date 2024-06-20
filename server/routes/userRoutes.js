const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");


router.post("/login", userController.loginUser);
router.post("/signup", userController.createUser);
router.get("/confirm-email/:userId", userController.confirmEmail);

router.post(
	"/profile",
	tokenValidation.validateToken,
	userController.getUserProfile
);
router.put(
	"/profile",
	tokenValidation.validateToken,
	userController.updateUserProfile
);
router.put(
	"/account",
	tokenValidation.validateToken,
	userController.addAccount
);
router.put(
	"/account/operations",
	tokenValidation.validateToken,
	userController.addOperation
);
router.put(
	"/account/operations/description",
	tokenValidation.validateToken,
	userController.updateDescription
);
router.put(
	"/account/operations/category",
	tokenValidation.validateToken,
	userController.updateCategory
);
router.put(
	"/account/close",
	tokenValidation.validateToken,
	userController.closeAccount
);

router.get("/", userController.getAllProfile);

router.get("/admin/", (req, res) => {
  userController.getAllProfilePagined(req, res);
});

router.put(
	"/budget",
	tokenValidation.validateToken,
	userController.updateBudget
)

router.put(
	"/beneficiaires",
	tokenValidation.validateToken,
	userController.addBeneficiaire
)
router.delete(
	"/beneficiaires",
	tokenValidation.validateToken,
	userController.deleteBeneficiaire
)

router.put(
	"/beneficiaires/modifier",
	tokenValidation.validateToken,
	userController.updateBeneficiaire
)
router.put(
	"/category",
	tokenValidation.validateToken,
	userController.addCategory
)
router.delete(
	"/category",
	tokenValidation.validateToken,
	userController.deleteCategory
)

router.put(
	"/category/modifier",
	tokenValidation.validateToken,
	userController.updateCategoryInArray
)

// const User = require("../database/models/userModel");
// const Operation = require("../database/models/userOperation");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// router.post("/operations", async (req, res) => {
// 	try {
// 		const jwtToken = req.headers.authorization.split("Bearer")[1].trim();
// 		const decodedJwtToken = jwt.decode(jwtToken);
// 		const userId = req.headers.id;
// 		const idAccount = req.headers.idaccount;
// 		const user = await User.findById(userId);

// 		const accountIndex = user.account.findIndex(
// 			(data) => data.id === idAccount
// 		);

// 		if (accountIndex === -1) {
// 			return res.status(404).json({ message: "Account not found" });
// 		}

// 		const account = user.account[accountIndex];

// 		const operations = req.body.operations;

// 		if (!operations || !Array.isArray(operations)) {
// 			return res.status(400).json({ message: "Invalid or missing 'operations' data" });
// 		}
		
// 		// Valider les montants des opérations
// 		const invalidOperations = operations.filter(op => isNaN(op.montant));
// 		if (invalidOperations.length > 0) {
// 			return res.status(400).json({ message: "Invalid operation amounts" });
// 		}
		
// 		// Crée les opérations une par une
// 		const createdOperations = await Operation.insertMany(operations);

// 		// Ajoute chaque nouvelle opération à la liste des opérations du compte
// 		createdOperations.forEach((newOperation) => {
// 			account.operations.push(newOperation);
// 		});

// 		// Met à jour le solde du compte
// 		const newSolde = createdOperations.reduce((total, operation) => {
// 			return total + operation.montant;
// 		}, account.solde);

// 		account.solde = newSolde;

// 		await user.save();

// 		res.status(201).json(createdOperations);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });
module.exports = router;
