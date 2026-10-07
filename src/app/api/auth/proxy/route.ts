import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  
  // Forward all query parameters (like id_token, state, etc.) back to the native Karty app
  const query = url.search;
  
  // Try to redirect to the native app scheme
  return NextResponse.redirect(`karty://expo-auth-session${query}`);
}
