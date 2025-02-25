export async function post({ request }) {
  try {
    const data = await request.formData()
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    // Configurar Nodemailer
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Puedes usar otro proveedor o SMTP
      auth: {
        user: 'nicolas.ratia@gmail.com', // Cambia esto por tu correo
        pass: 'D4v1dv1ll47' // Usa variables de entorno en producción
      }
    })

    // Configurar el correo
    await transporter.sendMail({
      from: email,
      to: 'nicolas.ratia@gmail.com', // Cambia esto por tu destinatario
      subject: 'Nuevo mensaje del formulario de contacto',
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
