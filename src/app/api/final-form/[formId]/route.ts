import { db } from "@/config"
import { form } from "@/config/schema"
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm"

export async function GET(request: Request,{params } : {params : {formId : string}}){

    const formId = Number(params.formId);
    const user= await currentUser()

    const username  =    String(user?.primaryEmailAddress?.emailAddress)

    try {
        const result = await db.select().from(form).where(and(eq(form.id,formId)))

        if(!result){
            return Response.json({
                success : false,
                message : "no form found",
            },{status : 401})
        }
        

        return Response.json({
            success : true,
            message : "form found",
            jsonForm : result[0].jsonForms,
            createdBy : result[0].createdBy
        },{status : 200})
    } catch (error) {
        return Response.json({
            success : false,
            message : "No form found ",
        },{status : 500})
    }

}