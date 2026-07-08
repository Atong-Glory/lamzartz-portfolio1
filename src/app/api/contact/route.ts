import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple in-memory rate limiter (resets on server restart — sufficient for a personal portfolio)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per IP per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up stale entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, 10 * 60 * 1000);
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, website, purpose } = body;

    // Honeypot check — if the hidden "website" field is filled, it's a bot
    if (website) {
      return NextResponse.json(
        { success: true, message: 'Message received. Thank you.' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      );
    }

    // Sanitize — prevent excessively long inputs
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 200);
    const sanitizedMessage = message.trim().slice(0, 5000);
    const sanitizedPurpose = typeof purpose === 'string' && purpose.trim() ? purpose.trim().slice(0, 50) : null;

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Purpose label for email subject
    const purposeLabel = sanitizedPurpose
      ? ` [${sanitizedPurpose}]`
      : '';

    // Send email notification
    const { error: sendError } = await resend.emails.send({
      from: 'LAMZ ARTZ Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'hello@lamzartz.com',
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact${purposeLabel}: ${sanitizedName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; color: #f5f5f0; background: #0a0a0a; padding: 32px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 1px solid #2a2a2a; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 18px; color: #c9a84c;">New message from your portfolio</h2>
            <p style="margin: 8px 0 0; font-size: 14px; color: #a8a8a0;">
              ${sanitizedPurpose ? `<span style="background: #1a1a1a; padding: 2px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">${sanitizedPurpose}</span>` : ''}
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #a8a8a0; font-size: 13px; width: 80px;">From</td>
              <td style="padding: 8px 0; font-size: 14px;"><strong>${sanitizedName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a8a8a0; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${sanitizedEmail}" style="color: #c9a84c; text-decoration: none;">${sanitizedEmail}</a></td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #111111; border: 1px solid #2a2a2a; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.8; white-space: pre-wrap; color: #f5f5f0;">${sanitizedMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #2a2a2a;">
            <p style="margin: 0; font-size: 12px; color: #a8a8a0;">
              Reply directly to this email to respond, or reply to <a href="mailto:${sanitizedEmail}" style="color: #c9a84c;">${sanitizedEmail}</a>.
            </p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message received. Thank you.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
