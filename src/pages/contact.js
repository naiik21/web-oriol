// src/pages/api/contact.js
import nodemailer from 'nodemailer';

export const post = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tu_email@gmail.com', // Reemplázalo por tu email
        pass: 'tu_contraseña',      // O usa OAuth2 para más seguridad
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'destinatario@gmail.com',
      subject: 'Nuevo mensaje del formulario de contacto',
      html: `
        <h2>Nuevo Mensaje de Contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};

export default post;
