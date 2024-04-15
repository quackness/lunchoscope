import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

export async function POST(req:any){
    try {
        
        const prisma = new PrismaClient();
    
        const {email} = await req.json();
    
        const userExists = await prisma.user.findUnique({where: {email: email}});
    
        console.log("find", userExists);
        
        delete userExists?.hashedPassword;


        const token = await new SignJWT(userExists).setProtectedHeader({ alg: 'HS256', typ: 'JWT' }).sign(new TextEncoder().encode('testpassword'));

    
        return NextResponse.json({success: true, msg:"received email", user: userExists},  {
            headers:{
                'Set-Cookie':`authToken=${token}`
            }
        } );
    } catch (error) {
        
        return NextResponse.json({success: false, msg:"error"});
    }

}