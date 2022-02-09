const { randomBytes } = require('crypto');
const nodemailer = require('nodemailer');
import { connectToDatabase } from '../../../lib/db';

const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    return transporter;
  } catch (error) {
    console.log(error);
    console.log({
      message: 'Something went wrong with the Gmail/Nodemailer configuration.',
      error,
    });
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).json({
      message: 'Invalid request type.',
    });
    return;
  }

  /* connect to db */
  const client = await connectToDatabase();

  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    });
    client.close();
    return;
  }

  const db = client.db();
  const usersCollection = db.collection('users');

  const thisUser = await usersCollection.findOne({ email: req.body });

  if (thisUser) {
    const resetToken = randomBytes(20).toString('hex');
    await usersCollection.findOneAndUpdate(
      { email: req.body },
      {
        $set: {
          resetToken,
          resetExpires: Date.now() + 360000,
        },
      }
    );

    var mailOptions = {
      to: req.body,
      from: process.env.APP_EMAIL,
      subject: 'BonnApp22 Password Reset',
      text: `You are receiving this email because you have requested a password reset for your BonnApp22 account ${req.body}. Paste the following link into your browser to reset your password: https://bonnapp22.vercel.app/reset/${resetToken}. If you did not request a password reset, please ignore this email.`,
      html: `
            <p>You are receiving this email because you have requested a password reset for your <em>BonnApp22</em> account ${req.body}. Click on the following link or paste it into your browser to reset your password:</p>

            <p>Reset link: <a href="https://bonnapp22.vercel.app/reset/${resetToken}">https://bonnapp22.vercel.app/reset/${resetToken}</a></p>

            <p>If you did not request a password reset, please ignore this email.</p>`,
    };

    const sendEmail = async (emailOptions) => {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(emailOptions);
    };

    await sendEmail(mailOptions);
  } else {
    client.close();
    res.status(500).json({ message: 'Email not found!' });
    return;
  }

  res.status(201).json({ message: 'Email sent!' });
  client.close();
}
