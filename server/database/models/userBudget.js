const mongoose = require("mongoose");


const budgetSchema = new mongoose.Schema(
		{
			name: String,
			value: Number,
		},
);
module.exports = mongoose.model("Budget", budgetSchema);
