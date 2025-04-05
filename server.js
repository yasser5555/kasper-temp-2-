require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    debug: true // Enable debug logging
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Transporter verification failed:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email content
        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to send message. Please try again later.';
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check your email credentials.';
        } else if (error.code === 'ESOCKET') {
            errorMessage = 'Connection error. Please check your internet connection.';
        }

        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Email configured for: ${process.env.EMAIL_USER}`);
}); 