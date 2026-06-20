const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // Serve index.html
});

// Serve the contact page
app.get('/contact', (req, res) => {
    console.log('Serving contact.html');
    res.sendFile(path.join(__dirname, '../pages/contact.html'), (err) => {
        if (err) {
            console.error('Error serving contact.html:', err);
            res.status(err.status).end();
        }
    });
});

// Route to handle form submission
app.post('/send-feedback', (req, res) => {
    const { name, email, message } = req.body;

    // Log feedback data to console for debugging
    console.log('Feedback received:', { name, email, message });

    // Prepare feedback data for saving
    const feedbackData = `
===============================
Name: ${name}
Email: ${email}
Message: ${message}
===============================\n`;

    // Append feedback to feedback.txt in the server folder
    console.log('Attempting to save feedback to feedback.txt...');
    fs.appendFile(path.join(__dirname, 'feedback.txt'), feedbackData, (err) => {
        if (err) {
            console.error('Error saving feedback:', err);
            return res.status(500).send('Error saving feedback.');
        }
        console.log('Feedback saved successfully!');
        res.send('Thank you for your feedback!');
    });
});

// Start the server
app.listen(port, () => {
    console.log('Server running on http://localhost:${port}');
});