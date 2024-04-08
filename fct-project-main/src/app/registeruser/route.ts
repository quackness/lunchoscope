import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
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
        const { email, name, hashedPassword, isAdmin, sentimentLeft, subscribed } = body;
      
        const newHashedPassword = await bcrypt.hash(hashedPassword, 8);
        
        

        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword: newHashedPassword,
                isAdmin,
                sentimentLeft,
                subscribed,
            },
        });

        
        return NextResponse.json({success: true, msg: "You have successfully registered"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, msg: "Unknown error occurred"})
    }
}