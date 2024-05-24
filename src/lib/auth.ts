import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        // json web token for session. Note: try both
        strategy: 'jwt'
    },
    // the signIn provided by nextAuth is redirected to /sign-in
    pages: {
        signIn: '/sign-in',
        // Add signout later
    },
    // providers array taken from next-auth documentation
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // if email or password not given, authorization fails
            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            // if user email does not match with a unique email from the database, authorization fails
            const existingUser = await db.user.findUnique({
                where: { email: credentials?.email }
            });
            if (!existingUser) {
                return null
            }

            // if user password does not match with the password of the user returned from db.user.findUnique, authorization fails
            const passwordMatch = await compare(credentials.password, existingUser.password)

            if (!passwordMatch) {
                return null
            }

            // If everything passes, authorize the user and return info about them
            return {
                id: existingUser.id + '',
                username: existingUser.username,
                email: existingUser.email
            }
          }
        })
      ]
}
  