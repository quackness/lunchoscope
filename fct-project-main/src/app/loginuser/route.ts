import  bcrypt  from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken';
import { SignJWT } from "jose";

export async function POST(req:any, res:any){

    try {
    const prisma = new PrismaClient();
 
    const {email, password} = await req.json();

    if(email === ''){
        return NextResponse.json({success: false, msg:"Email is invalid"});
    }
    else if(password === ''){
        return NextResponse.json({success: false, msg:"Password must not be empty"});
    }

    const userExists = await prisma.user.findUnique({where: {email: email}});
    
    console.log("exists", userExists);

    const passwordsMatch = await bcrypt.compare(password, userExists?.hashedPassword);

    console.log("match", passwordsMatch);
    


    if(userExists && passwordsMatch){

        // const token = await JWT.sign({id: userExists.id }, "testpassword", { expiresIn: "1d" });

        // Used jose library because JWT wasn't working in middleware.ts

        const token = await new SignJWT(userExists).setProtectedHeader({ alg: 'HS256', typ: 'JWT' }).sign(new TextEncoder().encode('testpassword'));
        
        return NextResponse.json({success: true, 
            msg:"User successfully logged in", 
            user: {
                email: userExists.email, 
                name: userExists.name, 
                isAdmin: userExists.isAdmin,
                sentimentLeft: userExists.sentimentLeft,
                subscribed: userExists.subscribed
            }}, {
            headers:{
                'Set-Cookie':`authToken=${token}`
            }
        } );
        
    }
    else{
        return NextResponse.json({success: false, msg:"Invalid login credentials"});
    }
    


    } catch (error) {
        return NextResponse.json({success: false, msg:"Some unknown error occurred"});
    }

}