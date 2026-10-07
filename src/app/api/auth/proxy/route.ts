import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  
  // For testing on iPhone in Expo Go, redirect back to the Expo tunnel
  const expoTunnel = 'exp://m5gpera-ahurika-8081.exp.direct';
  const query = url.search;
  return NextResponse.redirect(`${expoTunnel}${query}`);
}
