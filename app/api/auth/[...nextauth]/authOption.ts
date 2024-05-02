import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import client from "@/app/libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_ID as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_ID as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials:{
        email: {label: "email", type: "text"},
        password: {label: "password", type:"password"}
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error('invalid credentials')
        }

        const user = await prisma?.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        
        if(!user || !user?.hashedPassword){
          throw new Error('invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if(!isCorrectPassword){
          throw new Error('invalid credentials')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session:{
    strategy:'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}