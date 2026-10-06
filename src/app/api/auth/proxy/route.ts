import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  
  // Use the local Expo Go LAN URL (matches API_URL in AccountScreen.js)
  // To test on your physical device, deploy this change to Vercel,
  // Update this to your current Expo tunnel URL when testing with Expo Go
  const expoTunnel = 'exp://m5gpera-ahurika-8081.exp.direct';
  
  // Forward all query parameters (like id_token, state, etc.) back to the Expo app
  const query = url.search;
  
  return NextResponse.redirect(`${expoTunnel}${query}`);
}
