import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  
  // Use the local Expo Go LAN URL (matches API_URL in AccountScreen.js)
  // To test on your physical device, deploy this change to Vercel,
  // OR use a local tunnel (like ngrok) and update redirectUri in AccountScreen.js.
  const expoTunnel = 'exp://192.168.0.199:8082';
  
  // Forward all query parameters (like id_token, state, etc.) back to the Expo app
  const query = url.search;
  
  return NextResponse.redirect(`${expoTunnel}${query}`);
}
