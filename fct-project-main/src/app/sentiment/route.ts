import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function PATCH(req: any){
    const prisma = new PrismaClient();

    const {email} = await req.json();

    const userExists = await prisma.user.findUnique({where: {email: email}});

    
    if(userExists){
        const updateSentiment = await prisma.user.update({
            where: { email: email },
            data: {
                sentimentLeft: userExists.sentimentLeft-1
            }
        });

        delete updateSentiment?.hashedPassword;
        
        console.log("updated Sentiment", updateSentiment);
        return NextResponse.json({success: true, msg:"Updated successfully", newUser: {updateSentiment}});
    }
    
    

}