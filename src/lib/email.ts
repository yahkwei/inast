export const CONTACT_EMAIL = 'ghostarchives9@gmail.com'

const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export interface SubmitResult {
  success: boolean
  message?: string
}

export async function submitToEmail(
  subject: string,
  fields: Record<string, string>,
  options?: { replyTo?: string; file?: File | null },
): Promise<SubmitResult> {
  try {
    const payload: Record<string, string> = {
      _subject: subject,
      _captcha: 'false',
      _template: 'table',
      ...fields,
    }

    if (options?.replyTo) {
      payload._replyto = options.replyTo
    }

    if (options?.file) {
      const formData = new FormData()
      for (const [key, value] of Object.entries(payload)) {
        formData.append(key, value)
      }
      formData.append('attachment', options.file)

      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      const data = await response.json()
      if (!response.ok) {
        return { success: false, message: data.message ?? 'Submission failed.' }
      }
      return { success: true }
    }

    const response = await fetch(FORM_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    if (!response.ok) {
      return { success: false, message: data.message ?? 'Submission failed.' }
    }
    return { success: true }
  } catch {
    return {
      success: false,
      message: `Could not send. Please email us directly at ${CONTACT_EMAIL}.`,
    }
  }
}
