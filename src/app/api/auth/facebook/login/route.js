// app/api/auth/facebook/login/route.js
import { NextResponse } from 'next/server';

export function GET() {
  const fbAuthUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  fbAuthUrl.searchParams.set('client_id', process.env.FACEBOOK_CLIENT_ID);
  fbAuthUrl.searchParams.set('redirect_uri', process.env.FACEBOOK_REDIRECT_URI);
  fbAuthUrl.searchParams.set('scope', 'email');
  fbAuthUrl.searchParams.set('response_type', 'code');

  return NextResponse.redirect(fbAuthUrl.toString());
}
