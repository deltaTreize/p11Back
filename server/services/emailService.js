const nodemailer = require("nodemailer");
async function sendConfirmationEmail(userEmail, userId) {
  const confirmationLink = `http://localhost:3001/api/v1/user/confirm-email/${userId}`;

  console.log("Confirmation Link:", confirmationLink); 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'argentbankbyleblondludovic@gmail.com',
      pass: 'hdcfuzlgzcblprgg'
    }
  });
  const mailOptions = {
    from: 'argentbankbyleblondludovic@gmail.com',
    to: userEmail,
    subject: "Confirmation d'inscription",
    html: `
      <p>Merci de vous être inscrit sur notre site!</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour confirmer votre inscription :</p>
      <a href="${confirmationLink}">Confirmer l'inscription</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de confirmation envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail de confirmation :", error);
  }
}

module.exports = { sendConfirmationEmail };
