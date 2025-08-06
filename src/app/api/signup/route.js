import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/mailer';

export async function POST(req) {
  const { name, email, password } = await req.json();

  // You can add MongoDB user saving here

  try {
    await sendWelcomeEmail(email, name);
    return NextResponse.json({ message: 'User registered and email sent' });
  } catch (error) {
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
