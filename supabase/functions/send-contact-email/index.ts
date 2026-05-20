import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Metodo nao permitido" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }

  try {
    const { nome, email, assunto, mensagem } = await req.json()

    if (!nome || !email || !assunto || !mensagem) {
      return new Response(
        JSON.stringify({ error: "Todos os campos sao obrigatorios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const emailSubject = `Novo contacto do site - ${assunto}`

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b5ac97; border-bottom: 1px solid #b5ac97; padding-bottom: 12px;">
          Novo contacto pelo site Beta Atelier
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 100px;"><strong>Nome:</strong></td>
              <td style="padding: 8px 0;">${nome}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}">${email}</a>
              </td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Assunto:</strong></td>
              <td style="padding: 8px 0;">${assunto}</td></tr>
        </table>
        <h3 style="color: #666; margin-top: 24px;">Mensagem:</h3>
        <div style="background: #f5f5f5; padding: 16px; border-left: 3px solid #b5ac97; margin-top: 8px;">
          <p style="margin: 0; white-space: pre-wrap;">${mensagem}</p>
        </div>
        <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">
          Mensagem enviada pelo formulario de contacto do site Beta Atelier.

          Para responder, utilize o campo reply-to: ${email}
        </p>
      </div>
    `

    const resendPayload = {
      from: "noreply@effectidea.com",
      to: ["elisabetearede67@gmail.com"],
      reply_to: email,
      subject: emailSubject,
      html: emailHtml,
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    })

    const resendData = await resendRes.json()

    if (!resendRes.ok) {
      console.error("Resend error:", resendData)
      return new Response(
        JSON.stringify({ error: "Erro ao enviar email", details: resendData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, id: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (err) {
    console.error("Function error:", err)
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
