import nodemailer from 'nodemailer'

export default async function sendEmail(name, email, message) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes cambiarlo por otro servicio o SMTP
    auth: {
      user: 'tuemail@gmail.com',
      pass: 'tucontraseña'
    }
  })

  const mailOptions = {
    from: email,
    to: 'nicolas.ratia@gmail.com',
    subject: 'Nuevo mensaje del formulario de contacto',
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  }

  return transporter.sendMail(mailOptions)
}
