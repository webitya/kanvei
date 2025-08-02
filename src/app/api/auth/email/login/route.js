// app/api/auth/email/login/route.js

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Return success response
    return new Response(JSON.stringify({ message: 'Login successful', userId: user.userId }), {
      status: 200,
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
