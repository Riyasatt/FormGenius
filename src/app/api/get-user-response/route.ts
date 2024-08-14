import { db } from "@/config"
import { form, userResponses } from "@/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import {  eq } from "drizzle-orm"


export async function GET(request :Request){

    const user = await currentUser()
    const username  =    String(user?.primaryEmailAddress?.emailAddress)

    try {
        
        const result = await db.select({form : form.jsonForms,formId : userResponses.formId, response : userResponses.response,responseAt : userResponses.responseAt,responseBy : userResponses.responseBy}).from(userResponses).leftJoin(form , eq(userResponses.formId,form.id)).where(eq(form.createdBy, username))


        if(!result){
            return Response.json({
                success : true,
                message : "user response fetched successfully",
                userResponse : result
            },{status : 200})
        }

        

        return Response.json({
            success : true,
            message : "user response fetched successfully",
            userResponse : result
        },{status : 200})

    } catch (error) {
        console.log(error);
        return Response.json({
            success : false,
            message : "unable to fetch user responses",
        },{status : 500})
    }

    
}