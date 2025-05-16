import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const comfirmLink = `http://localhost:3000/new-verification?token=${token}`

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'CCED UNILA',
    html: `<p>Click for <a href="${comfirmLink}">Verification</a>.</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const comfirmLink = `http://localhost:3000/reset-password?token=${token}`

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'CCED UNILA',
    html: `<p>Click for <a href="${comfirmLink}">Password Reset</a>.</p>`,
  })
}
