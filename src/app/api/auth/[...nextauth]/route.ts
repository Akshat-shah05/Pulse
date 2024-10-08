import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt'
import { db } from "@/lib/db";

// jwt based authenticator with client credentials
const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
        signOut: '/'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: {  },
            password: {  }
          },

          // authorization function
          async authorize(credentials, req) {
            console.log({ credentials })
            if (!credentials?.email || !credentials?.password) {
                return null
            }
            const response = await db.user.findUnique({
                where: {email: credentials?.email}
            })
            console.log(response)
            if (!response) {
                return null
            }
            
            // password matching
            const match = await compare(credentials?.password || "", response.password)
            console.log({match})
            if (match) {
                return {
                    id: response.id,
                    email: response.email,
                    username: response.username
                }
            }

            return null

          }
        })
      ]
})

// GET and POST accepted at handler
export { handler as GET, handler as POST }