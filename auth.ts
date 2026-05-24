import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: any }) {
      if (user) {
        token.name = user.name as string
        token.email = user.email as string
      }
      return token
    },
    async session({ session, token }: { session: any, token: JWT }) {
      if (token && session.user) {
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },


  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) }
        })
        if (!user || !user.password) {
          return null
        }
        const isValid = await bcrypt.compare(
          String(credentials.password),
          user.password
        )

        if (!isValid) {
          return null
        }

        return { id: user.id, name: user.name, email: user.email }

      }
    })
  ],
  pages: {
    signIn: "/auth/register"
  },
  secret: process.env.NEXTAUTH_SECRET
}

