import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import client from "@/app/libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { authOptions } from "./authOption";


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }