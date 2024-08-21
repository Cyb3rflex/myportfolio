// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail' or your email service provider
    auth: {
        user: 'abdulmuheezq@gmail.com', // your email address
        pass: 'Abdulmuheezq12-34'   // your email password or app-specific password
    }
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation (optional)
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Setup email data
    const mailOptions = {
        from: email, // sender address
        to: 'abdulmuheezq@gmail.com', // your email address where you want to receive the form data
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new message from your contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('An error occurred while sending the email.');
        }
        res.status(200).send('Form submission successful! Your message has been sent.');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

