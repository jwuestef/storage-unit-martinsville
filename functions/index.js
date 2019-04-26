
// Environment variables
// *variables must be all lowercase

// To set, type in command line:
// firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"

// To view all, type in command line:
// firebase functions:config:get

// To delete, type in command line:
// firebase functions:config:unset [key1] [key2...]

// Use the environment variable in a function:
// functions.config().someservice.id


// Require the node modules
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Pull the gmail login info out of the environment variables
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Configure the nodemailer with our gmail info
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});



// Sends an email to our Gmail account when someone submits the Contact Us form
exports.sendContactMessage = functions.https.onRequest((req, res) => {
    // Initialize the mailOptions variable
    const mailOptions = {
        from: gmailEmail,
        to: gmailEmail,
    };
    // Building Email message.
    mailOptions.subject = 'Contact form submitted';
    mailOptions.text = `
    New contact form submission:
      Name: ${req.body.contactRequestName}
      Phone: ${req.body.contactRequestPhone}
      Message: ${req.body.contactRequestMessage}
  `;
    // Actually send the email, we need to reply with JSON
    return mailTransport.sendMail(mailOptions).then(() => {
        // Successfully sent email
        let objToReplyWith = {
            answer: 'Message has been sent!'
        }
        res.json(objToReplyWith);
    }).catch(err => {
        // Failed to send email
        console.log('There was an error while sending the email:');
        console.log(err);
        let objToReplyWith = {
            answer: 'Error sending message. Please contact us at StorageUnitMartinsville@gmail.com'
        }
        res.json(objToReplyWith);
    });
});