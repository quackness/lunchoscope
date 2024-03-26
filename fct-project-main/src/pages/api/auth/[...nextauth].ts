import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prisma"
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

type UserWhereUniqueInput = {
  id?: string;
  email?: string;
};


const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
          } as UserWhereUniqueInput,
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
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // })
  ],
  // pages: {
  //   signIn: "/login",
  //   error: "/login",
  // },
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60,
    // updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const NextAuthInstance = NextAuth(authOptions);

export default NextAuthInstance;

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST}

// function GithubProvider(arg0: {}): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

// 如果需要分别导出 GET 和 POST 处理程序，可以这样做
// export const GET = NextAuthInstance;
// export const POST = NextAuthInstance;
