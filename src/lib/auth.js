import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { db } from "@/lib/db";

export const auth = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          console.log("Missing credentials");
          return null;
        }

        const admin = await db.admin.findUnique({
          where: { email },
        });

        if (!admin) {
          console.log("Admin not found");
          return null;
        }

        const isValid = await compare(password, admin.hashPassword);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: admin.id.toString(),
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },
};
