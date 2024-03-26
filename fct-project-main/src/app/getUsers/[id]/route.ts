import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Request {
  url: string;
}

export async function DELETE(request: Request) {
  try {
    console.log(request.url)
    const address = request.url.split('/');
    const id = address[address.length - 1];
    console.log("ID:", id);

    // Use Prisma to delete the user with the specified ID
    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    });

    console.log("User deleted:", deletedUser);
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Error deleting user", { status: 500 });
  }
}
