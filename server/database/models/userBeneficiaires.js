const mongoose = require("mongoose");
const Operation = require("./userOperation");

const beneficiairesSchema = new mongoose.Schema({
	name: String,
	rib: String,
});
module.exports = mongoose.model("Beneficiaires", beneficiairesSchema);
