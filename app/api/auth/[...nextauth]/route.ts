import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const res = await fetch(`${process.env.API_BACKEND_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: account.id_token }),
        });
        const data = await res.json();

        // Forward the backend's Set-Cookie (httpOnly refresh_token) to the browser
        const setCookieHeader = res.headers.get("set-cookie");
        if (setCookieHeader) {
          const cookieStore = await cookies();
          const [nameValue, ...attrs] = setCookieHeader.split(";");
          const [name, value] = nameValue.split("=");
          cookieStore.set(name.trim(), decodeURIComponent(value), {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/api/auth",
          });
        }

        token.accessToken = data.data;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };