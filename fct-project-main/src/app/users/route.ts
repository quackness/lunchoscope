import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function GET(req: any) {
  const allUsers = await prisma.user.findMany()
  return NextResponse.json(allUsers);
}

//the connection works, verified at http://localhost:3000/users