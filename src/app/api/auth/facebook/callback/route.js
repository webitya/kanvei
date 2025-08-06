// app/api/auth/facebook/callback/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { createJWT } from '@/lib/jwt';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code returned from Facebook' }, { status: 400 });
  }

  try {
    await connectDB();

    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
    const redirectUri = process.env.FACEBOOK_REDIRECT_URI;

    // 1. Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return NextResponse.json({ error: 'Token exchange failed', details: tokenData }, { status: 500 });
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch user profile
    const profileRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );
    const profile = await profileRes.json();

    if (!profile || !profile.id || !profile.email) {
      return NextResponse.json({ error: 'Failed to fetch complete Facebook profile' }, { status: 500 });
    }

    // 3. Find or merge user by facebookId or email
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      // Check if user exists by email (e.g., already logged in with Google)
      user = await User.findOne({ email: profile.email });

      if (user) {
        // Link Facebook ID to existing user
        user.facebookId = profile.id;
        if (!user.name) user.name = profile.name;
        if (!user.picture) user.picture = profile.picture?.data?.url || '';
        await user.save();
      } else {
        // Create a new user
        user = await User.create({
          facebookId: profile.id,
          email: profile.email,
          name: profile.name,
          picture: profile.picture?.data?.url || '',
        });
      }
    }

    // 4. Generate JWT and set cookie
    const token = createJWT(user);

    const response = NextResponse.redirect('http://localhost:3000/profile');
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Facebook login error:', err);
    return NextResponse.json({ error: 'Facebook Auth Failed' }, { status: 500 });
  }
}
