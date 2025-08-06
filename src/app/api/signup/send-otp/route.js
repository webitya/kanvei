import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Otp from '@/models/Otp';
import bcrypt from 'bcryptjs';
import { sendOTP } from '@/lib/mailer';

export async function POST(req) {
  await connectDB();

  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    console.log('Sending OTP to:', email); // ✅ Debug

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTP(email, otp);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error sending OTP:', err);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
