import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: any){

    try {
        const prisma = new PrismaClient();
 
    const {email} = await req.json();
    console.log("test email", email);
    
    } catch (error) {
        
    }


}