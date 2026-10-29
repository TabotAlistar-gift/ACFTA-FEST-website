export interface EmailDispatchResult {
  ok: boolean;
  message?: string;
}

/**
 * Dispatches a professional ACFTA Fest confirmation email to the recipient.
 * Note: FormSubmit AJAX requires standard browser Referer headers (`http://` or `https://`)
 * to validate origin authenticity; never strip Referer with `no-referrer`.
 */
export async function sendFestivalEmail(
  recipientEmail: string,
  fields: Record<string, string>,
): Promise<EmailDispatchResult> {
  const cleanEmail = recipientEmail.trim();
  if (!cleanEmail) {
    return { ok: false, message: 'Recipient email address is empty.' };
  }

  const encoded = encodeURIComponent(cleanEmail);
  const payload = {
    _template: 'table',
    _captcha: 'false',
    ...fields,
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encoded}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await response.json()) as {
        success?: boolean | string;
        message?: string;
      };
      const succeeded = data.success === true || data.success === 'true';
      if (!succeeded) {
        console.warn('[ACFTA Fest Email Dispatch] Service reported non-success:', data.message);
        return { ok: false, message: data.message };
      }
      return { ok: true, message: data.message };
    }

    if (!response.ok) {
      console.warn('[ACFTA Fest Email Dispatch] Unexpected status:', response.status);
      return { ok: false, message: `Email service returned HTTP ${response.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.warn(
      '[ACFTA Fest Email Dispatch] Network error during email dispatch:',
      err instanceof Error ? err.message : err,
    );
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Email delivery error',
    };
  }
}
