export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    // Configuración del transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Usa variables de entorno
        pass: process.env.EMAIL_PASS // Usa variables de entorno
      }
    })

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Cambia esto por el correo donde quieres recibir los mensajes
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    }

    // Enviar el correo
    try {
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Correo enviado correctamente' })
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      res.status(500).json({ message: 'Error al enviar el correo' })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
