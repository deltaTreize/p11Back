const mongoose = require("mongoose");
const User = require("./database/models/userModel");

const updateOperationsByName = async () => {
	const operationsToUpdate = [
		{ name: "paye", description: "", category: "salaire" },
		{ name: "", description: "loyer", category: "loyer" },
		{ name: "cotisation", description: "", category: "frais bancaires" },
		{ name: "prelevement ORANGE", description: "", category: "telephonie" },
		{ name: "", description: "course", category: "alimentation" },
		{ name: "prelevement MMA", description: "", category: "assurances" },
		{ name: "prelevement M H V", description: "", category: "sante" },
		{ name: "", description: "Pension alimentaire", category: "pension" },
		{ name: "", description: "carburant", category: "transport" },
	];

	try {
		const users = await User.find({});

		// Itérer à travers chaque utilisateur
		for (const user of users) {
			for (const account of user.account) {
				for (const op of account.operations) {
					for (const operation of operationsToUpdate) {
						if (
							op.title === operation.name ||
							op.description === operation.description
						) {
							op.category = operation.category;
						}
					}
				}
			}
			await user.save();
		}

		console.log("Mise à jour des opérations terminée.");
	} catch (error) {
		console.error("Erreur lors de la mise à jour des opérations :", error);
	} finally {
		mongoose.disconnect();
	}
};

module.exports = { updateOperationsByName };
