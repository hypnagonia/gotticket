const nodemailer = require('nodemailer');


// todo try catch
// todo logger if failed
export const generateTicketNumberEmail = (email: string, number: string) => {
  const url = process.env.BACKEND_URL;
  const mail = {
    from: process.env.EMAIL_LOGIN, // sender address
    to: email, // list of receivers
    subject: 'Your Ticket From Gotticket', // Subject line
    text: `Your Ticket Number is ${number}`, // plain text body
    html: `<b>Your Ticket Number is ${number}</b><br/>
    <a href="${url}/transactions/image/${number}">Click here if you do not see QR code</a><br/>
    Or copy this url manually:<br/>
    ${url}/transactions/image/${number}
    `, // html body
    attachments: [
      {
        // file on disk as an attachment
        filename: 'QR-code.png',
        path: `${url}/transactions/image/${number}/png`, // stream this file
      },
    ],
  };

  return mail;
};

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(mail: any) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVER_NAME,
    host: process.env.EMAIL_SERVER_SMTP,
    auth: {
      user: process.env.EMAIL_LOGIN, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail(mail);
  console.log({info})
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
