import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Otp from '@/models/Otp';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '@/lib/mailer';

export async function POST(req) {
  await connectDB();

  const { email, username, password, otp } = await req.json();

  if (!email || !password || !otp || !username) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const otpRecord = await Otp.findOne({ email });
  if (!otpRecord) {
    return NextResponse.json({ error: 'No OTP found for this email' }, { status: 404 });
  }

  // ✅ Use bcrypt to compare hashed OTP
  const isMatch = await bcrypt.compare(otp, otpRecord.otp);
  const isExpired = otpRecord.expiresAt < new Date();

  if (!isMatch || isExpired) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  await Otp.deleteOne({ email });

  await sendWelcomeEmail(email, username);

  return NextResponse.json({ message: 'User created successfully' });
}
