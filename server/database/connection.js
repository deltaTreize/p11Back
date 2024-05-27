const mongoose = require('mongoose')
const dotEnv = require("dotenv");
dotEnv.config();
const databaseUrl = "mongodb+srv://ludoleblond13:Aujourdui1+@cluster0.vhjcddm.mongodb.net/argentBank?retryWrites=true&w=majority";
module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
