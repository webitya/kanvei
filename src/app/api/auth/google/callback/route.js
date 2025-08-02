// app/api/auth/google/callback/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Token exchange failed', details: tokenData }, { status: 400 });
    }

    // 2. Fetch user profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();

    if (!profile?.id || !profile?.email) {
      return NextResponse.json({ error: 'Invalid profile data' }, { status: 400 });
    }

    // 3. Connect to DB
    await dbConnect();

    // 4. Find user by Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // 5. If not found, check if user with same email exists (e.g., Facebook sign in)
      user = await User.findOne({ email: profile.email });

      if (user) {
        // Link Google ID to existing account
        user.googleId = profile.id;
        if (!user.name) user.name = profile.name;
        if (!user.picture) user.picture = profile.picture;
        await user.save();
      } else {
        // Create a new user
        user = await User.create({
          googleId: profile.id,
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
        });
      }
    }

    // 6. Generate JWT
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // 7. Redirect to profile and set cookie
    const response = NextResponse.redirect(new URL('/profile', req.url));
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Google OAuth error:', err);
    return NextResponse.json({ error: 'Google Auth Failed', message: err.message }, { status: 500 });
  }
}
