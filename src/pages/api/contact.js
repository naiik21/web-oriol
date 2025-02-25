import sendEmail from '../../utilities/sendEmail'

export async function post({ request }) {
  try {
    const data = await request.formData()
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    await sendEmail(name, email, message)

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
