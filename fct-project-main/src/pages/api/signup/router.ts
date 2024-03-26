import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

export async function POST(req: any, res: any) {

    // export async function POST(req: any) {
    //     const { latitude, longitude } = await req.json();
    //     console.log(latitude, longitude)
    //     const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`, options);
    //     const result = await response.json()
    //     return NextResponse.json(result);
    //   }

    try {
        const body = await req.json();
        const { email, name, Password, isAdmin, sentimentLeft, subscribed } = body;
        console.log(body);
        const hashedPassword = await bcrypt.hash(Password, 12);
        console.log("here");

        const user = await prisma.user.create({
            // data: {
                email,
                name,
                hashedPassword,
                isAdmin,
                sentimentLeft,
                subscribed,
            // },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json(400);
    }
}