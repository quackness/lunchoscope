import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Request {
  url: string;
}

export async function GET(request: Request) {
  console.log(request)

  console.log(request.url)
  const address = request.url.split('/');
  const id = address[address.length - 1];
  console.log("ID:", id);
  const findUser = await prisma.user.findUnique({
    where: {
      id
    }
  });
  console.log(findUser);
  if (findUser) {
    console.log(findUser);
    return NextResponse.json(findUser);
  } else {
    return new Response("User not found", { status: 404 });
  }
}


export async function DELETE(request: Request) {
  console.log(request)
  try {
    console.log(request.url)
    const address = request.url.split('/');
    const id = address[address.length - 1];
    console.log("ID:", id);
    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    })
    console.log("User deleted:", deletedUser);
    return new Response("User deleted", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error", { status: 500 });
  }
}


export async function PATCH(request: Request) {
  // https://www.prisma.io/docs/orm/prisma-client/queries/crud
  try {
    console.log("req", request.url)
    const address = request.url.split('/');
    const id = address[address.length - 1];
    const { name, email, isAdmin, sentimentLeft, subscribed } = await request.json();
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        isAdmin,
        sentimentLeft,
        subscribed
      },
    });
    console.log("User", updateUser);
    return new Response("User updated", { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response("Error updating user", { status: 500 });
  }


}
