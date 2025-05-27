require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resend = require('resend');

const app = express();

// Configure CORS to allow requests from your React app
app.use(cors({
  origin: ['https://react-web-app-lemon.vercel.app', 'http://localhost:5173']
}));

app.use(bodyParser.json());

// Initialize Resend
const resendClient = new resend.Resend(process.env.RESEND_API_KEY);

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Send email using Resend
    await resendClient.emails.send({
      from: 'Glad Agency <onboarding@resend.dev>',
      to: [process.env.TO_EMAIL],
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
