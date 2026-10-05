import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import prisma from '@/lib/db';
import crypto from 'crypto';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
    }

    if (idToken === 'dev-token' && process.env.NODE_ENV !== 'production') {
      let user = await prisma.user.findUnique({ where: { email: 'dev@karty.com' } });
      if (!user) {
        user = await prisma.user.create({
          data: { email: 'dev@karty.com', name: 'Dev User' }
        });
      }
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      await prisma.session.create({ data: { sessionToken, userId: user.id, expires } });
      return NextResponse.json({ sessionToken, user });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure the mobile app uses the same Client ID or you add its Client ID here
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }

    const { email, name, picture, sub } = payload;

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          image: picture,
        }
      });
    }

    // Upsert the Account connection for Google
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId: sub,
        }
      },
      update: {},
      create: {
        userId: user.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: sub,
      }
    });

    // Create a new session for the mobile app
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // 30 days expiry

    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      }
    });

    return NextResponse.json({ sessionToken, user });

  } catch (error) {
    console.error("Mobile auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
