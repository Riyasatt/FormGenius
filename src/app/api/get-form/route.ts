import { db } from "@/config"
import { form } from "@/config/schema"
import { auth, currentUser, clerkClient, OauthAccessToken } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm"

export async function GET(request: Request){

    const user = await currentUser()
    
    


    const username  =    String(user?.primaryEmailAddress?.emailAddress)

    try {
        const result = await db.select().from(form).where(eq(form.createdBy,username))



        if(!result){
            return Response.json({
                success : false,
                message : "no form found",
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "success getting Form",
            allInfo : result
        },{status : 200})
    } catch (error) {
        return Response.json({
            success : false,
            message : "No form found ",
        },{status : 500})
    }

}