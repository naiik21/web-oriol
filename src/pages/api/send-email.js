import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { name, email, message } = await req.json()

    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Puedes usar otro proveedor (Outlook, SMTP personal)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Nuevo mensaje desde tu página web',
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    })
  }
}
