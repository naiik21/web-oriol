import nodemailer from 'nodemailer'

export async function POST({ request }) {
  try {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        {
          status: 400
        }
      )
    }

    // Configuración del transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Puedes usar otro proveedor SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Usa variables de entorno para seguridad
      }
    })

    // Enviar correo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Tu correo donde recibirás los mensajes
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Correo:</strong> ${email}</p>
             <p><strong>Mensaje:</strong> ${message}</p>`
    })

    return new Response(
      JSON.stringify({ success: 'Mensaje enviado correctamente' }),
      {
        status: 200
      }
    )
  } catch (error) {
    console.error('Error enviando el correo:', error)
    return new Response(JSON.stringify({ error: 'Error enviando el correo' }), {
      status: 500
    })
  }
}
