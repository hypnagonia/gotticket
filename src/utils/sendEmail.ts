const nodemailer = require("nodemailer");


export const generateTicketNumberEmail = (number: string) => {
  const url = process.env.BACKEND_URL
  const mail = {
    from: 'jenya.nepoimannykh@gmail.com', // sender address
    to: "hypnagonia@gmail.com", // list of receivers
    subject: "Your Ticket From Gotticket", // Subject line
    text: `Your Ticket Number is ${number}`, // plain text body
    html: `<b>Your Ticket Number is ${number}</b>
    <div style="width: 200px; height: 200px; margin-top:50px">
    <img src="${url}/transactions/image/${number}"
    style="width:100%;height:100%"
    />
    </div>
    `, // html body
  }

  return mail
}

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(mail: any) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport

  console.log(process.env.EMAIL_LOGIN)
  console.log(process.env.EMAL_P)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_LOGIN, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
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
