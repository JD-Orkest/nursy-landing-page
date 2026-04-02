import nodemailer from 'nodemailer'

interface ContactBody {
  prenom: string
  nom: string
  telephone: string
  email: string
  message: string
}

// Échappe les caractères HTML pour éviter les injections dans le template e-mail
const escapeHtml = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

// Rate limiter en mémoire : 5 requêtes max par IP sur 10 minutes
const ipLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const LIMIT = 5
  const WINDOW_MS = 10 * 60 * 1000
  const entry = ipLimits.get(ip)
  if (entry && now < entry.resetAt) {
    if (entry.count >= LIMIT) return false
    entry.count++
  } else {
    ipLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  }
  return true
}

export default defineEventHandler(async (event) => {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    getRequestIP(event) ??
    'unknown'

  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Trop de requêtes. Veuillez patienter.' })
  }

  // ── Lecture + validation du corps ────────────────────────────────────────
  const body = await readBody<ContactBody>(event)
  const { prenom, nom, telephone, email, message } = body ?? {}

  if (!prenom?.trim() || !nom?.trim() || !telephone?.trim() || !email?.trim() || !message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Tous les champs sont requis.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse e-mail invalide.' })
  }
  if (message.length > 5000 || nom.length > 100 || prenom.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Contenu trop long.' })
  }

  // ── Construction de l'e-mail ─────────────────────────────────────────────
  const subject = `[Nursy Contact] Nouveau message de ${prenom} ${nom}`

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #181C1D;">
      <h2 style="color: #15919B; margin-top: 0;">Nouveau message via le formulaire nursy</h2>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 16px 8px 0; font-weight: 700; white-space: nowrap; color: #181C1D;">Prénom</td>
          <td style="padding: 8px 0; color: #7FA5A8;">${escapeHtml(prenom)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px 8px 0; font-weight: 700; color: #181C1D;">Nom</td>
          <td style="padding: 8px 0; color: #7FA5A8;">${escapeHtml(nom)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px 8px 0; font-weight: 700; color: #181C1D;">Téléphone</td>
          <td style="padding: 8px 0; color: #7FA5A8;">${escapeHtml(telephone)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px 8px 0; font-weight: 700; color: #181C1D;">E-mail</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color: #15919B;">${escapeHtml(email)}</a>
          </td>
        </tr>
      </table>
      <div style="background: #F6FAFA; border-radius: 8px; padding: 16px;">
        <p style="margin: 0 0 8px; font-weight: 700; color: #181C1D;">Message</p>
        <p style="margin: 0; color: #7FA5A8; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
  `

  const RECIPIENTS = ['glenn.belmans@orkest.tech', 'julien.deprez@orkest.tech']

  // ── Mode développement : log console uniquement ──────────────────────────
  if (import.meta.dev) {
    console.log('\n╔══════════════════════════════════════════════╗')
    console.log('║  [Nursy Contact] DEV — E-mail non envoyé    ║')
    console.log('╚══════════════════════════════════════════════╝')
    console.log(`  Destinataires : ${RECIPIENTS.join(' | ')}`)
    console.log(`  Sujet         : ${subject}`)
    console.log(`  Prénom / Nom  : ${prenom} ${nom}`)
    console.log(`  Téléphone     : ${telephone}`)
    console.log(`  E-mail        : ${email}`)
    console.log(`  Message       :\n  ${message.replace(/\n/g, '\n  ')}`)
    console.log('─'.repeat(48) + '\n')
    return { success: true }
  }

  // ── Mode production : envoi SMTP ─────────────────────────────────────────
  const config = useRuntimeConfig()

  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    throw createError({ statusCode: 500, statusMessage: 'Configuration SMTP manquante côté serveur.' })
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort) || 587,
    secure: (Number(config.smtpPort) || 587) === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  await transporter.sendMail({
    from: `"nursy" <${config.smtpFrom || config.smtpUser}>`,
    to: RECIPIENTS,
    replyTo: email,
    subject,
    html: htmlBody,
  })

  return { success: true }
})
