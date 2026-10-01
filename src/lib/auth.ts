import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "database", // Persist session in PostgreSQL
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Attach user ID to the session object
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/account/login',
  }
};
