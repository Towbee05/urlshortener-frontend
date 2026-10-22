// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google" && account.id_token) {
        const res = await fetch(`${process.env.API_BACKEND_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: account.id_token }),
        });
        const data = await res.json();
        await forwardRefreshCookie(res);
        token.accessToken = data.data.accessToken;
        return token;
      }

      if (account?.provider === "github" && account.access_token) {
        const res = await fetch(`${process.env.API_BACKEND_URL}/api/auth/github`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: account.access_token }),
        });
        const data = await res.json();
        await forwardRefreshCookie(res);
        token.accessToken = data.data.accessToken;
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

async function forwardRefreshCookie(res: Response) {
  const setCookieHeader = res.headers.get("set-cookie");
  if (!setCookieHeader) return;

  const [nameValue] = setCookieHeader.split(";");
  const [name, value] = nameValue.split("=");
  const cookieStore = await cookies();
  cookieStore.set(name.trim(), decodeURIComponent(value), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/api/auth",
  });
}

export { handler as GET, handler as POST };