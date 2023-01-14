import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.type) token.type = user.type;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.type) session.user.type = token.type;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      // type: "credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/auth/SignIn`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());
        if (user?.success) {
          const newUser = {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            image: user?.image,
            type: user?.type,
          };
          return newUser;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/account",
  },
  secret: process.env.JWT_SECRET,
});
