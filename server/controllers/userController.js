const userService = require('../services/userService');
const User = require("../database/models/userModel");


module.exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error('Something went wrong in userController.js', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.confirmEmail = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("<h1>Utilisateur non trouvé</h1>");
    }

    if (user.confirmed) {
      return res.status(400).send("<h1>L'utilisateur est déjà confirmé</h1>");
    }

    user.confirmed = true;
    await user.save();

    res.status(200).send("<h1>L'utilisateur a été confirmé avec succès</h1>");
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Erreur lors de la confirmation de l'utilisateur</h1>");
  }
};

module.exports.loginUser = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.loginUser(req.body)
    response.status = 200
    response.message = 'User successfully logged in'
    response.body = responseFromService
  } catch (error) {
    console.error('Error in loginUser (userController.js)')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getUserProfile(req)
    response.status = 200
    response.message = 'Successfully got user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getAllProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getAllProfile(req, res)
    response.status = 200
    response.message = 'Successfully got All users profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.getAllProfilePagined = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getAllProfilePagined(req, res)
    response.status = 200
    response.message = 'Successfully got All users profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateUserProfile(req)
    response.status = 200
    response.message = 'Successfully updated user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateDescription = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateDescription(req)
    response.status = 200
    response.message = 'Successfully updated description of operation'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.updateCategory = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateCategory(req)
    response.status = 200
    response.message = 'Successfully updated category of operation'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.updateBeneficiaire = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateBeneficiaire(req)
    response.status = 200
    response.message = 'Successfully updated beneficiaire'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.updateBudget = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateBudget(req)
    response.status = 200
    response.message = 'Successfully updated budget amount'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.addAccount = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.addAccount(req)
    response.status = 200
    response.message = 'Successfully create a new account'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.addBeneficiaire = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.addBeneficiaire(req)
    response.status = 200
    response.message = 'Successfully create a new beneficiaire'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.deleteBeneficiaire = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.deleteBeneficiaire(req)
    response.status = 200
    response.message = 'Successfully delete beneficiaire'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.addOperation = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.addOperation(req)
    response.status = 200
    response.message = 'Successfully create a new operation'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.closeAccount = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.closeAccount(req)
    response.status = 200
    response.message = 'Successfully close this account'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in closeAccount - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}