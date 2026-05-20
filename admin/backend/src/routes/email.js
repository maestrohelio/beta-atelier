// src/routes/email.js
import { Router } from 'express'
import { query } from '../db/index.js'

const router = Router()

router.post('/send', async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
    }

    // Le o email destino da base de dados (editavel no painel)
    const { rows } = await query(
      "SELECT value FROM site_settings WHERE key = 'resend_to_email'",
    )
    const toEmail = rows[0]?.value ?? 'elisabetearede67@gmail.com'

    const RESEND_KEY = process.env.RESEND_API_KEY
    if (!RESEND_KEY) {
      return res.status(500).json({ error: 'Resend nao configurado.' })
    }

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#b5ac97;border-bottom:1px solid #b5ac97;padding-bottom:12px">
          Novo contacto pelo site Beta Atelier
        </h2>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;color:#666;width:100px"><strong>Nome:</strong></td>
            <td style="padding:8px 0">${nome}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666"><strong>Email:</strong></td>
            <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666"><strong>Assunto:</strong></td>
            <td style="padding:8px 0">${assunto}</td>
          </tr>
        </table>
        <h3 style="color:#666;margin-top:24px">Mensagem:</h3>
        <div style="background:#f5f5f5;padding:16px;border-left:3px solid #b5ac97">
          <p style="margin:0;white-space:pre-wrap">${mensagem}</p>
        </div>
        <hr style="margin-top:32px;border:none;border-top:1px solid #eee"/>
        <p style="color:#999;font-size:12px">
          Mensagem enviada pelo formulário de contacto do site Beta Atelier.
        </p>
      </div>
    `

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@effectidea.com',
        to: [toEmail],
        reply_to: email,
        subject: `Novo contacto do site - ${assunto}`,
        html: htmlBody,
      }),
    })

    const resendData = await resendRes.json()

    if (!resendRes.ok) {
      console.error('[Email] Resend erro:', resendData)
      return res.status(500).json({
        error: 'Erro ao enviar email.',
        details: resendData,
      })
    }

    return res.json({ success: true, id: resendData.id })
  } catch (err) {
    console.error('[Email] Erro interno:', err.message)
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
})

export default router
