import bcrypt from "bcrypt";
import NextAuth, {  Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/libs/prisma";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const authOptions: any = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      console.log("my user", user)
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        
        try {
          if (!user.email) {
            throw new Error("User email is missing.");
          }
          const existingUser = await prisma.user.findUnique({   
            where: {
            email: user.email,
          }  });
          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name || '',
                email: user.email,
                hashedPassword: "",
                isAdmin: false,
                sentimentLeft: 5,
                subscribed: false,
              } ,
            });
          }
          
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    }
  },

  session: {
    strategy: "jwt",
  },
    secret: process.env.JWT_SECRET,

 
};

const NextAuthInstance = NextAuth(authOptions);

export default NextAuthInstance;

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST}

// function GithubProvider(arg0: {}): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

