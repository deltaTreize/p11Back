const mongoose = require("mongoose");


const operationSchema = new mongoose.Schema(
  {
    date: String,
    title: String,
    description: String,
    montant: Number,
    category: String,
  },);
module.exports = mongoose.model("Operation", operationSchema);



