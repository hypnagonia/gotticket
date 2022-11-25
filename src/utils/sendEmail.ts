const nodemailer = require("nodemailer");


export const generateTicketNumberEmail = (number: string) => {
  const mail = {
    from: 'Got Ticket', // sender address
    to: "hypnagonia@gmail.com", // list of receivers
    subject: "Your Ticket Number", // Subject line
    text: `Your Ticket Number is ${number}`, // plain text body
    html: `<b>Your Ticket Number is ${number}</b>`, // html body
  }

  return mail
}

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(mail: any) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'leonor.herzog@ethereal.email', // generated ethereal user
      pass: 'Y8kBnjcF2Qa8XJuTcr', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(mail);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}