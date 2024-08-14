import { db } from "@/config";
import { form } from "@/config/schema";
import { eq } from "drizzle-orm";


export async function POST(request: Request){

    const {jsonForm,id} = await request.json();

    const strJsonForm = JSON.stringify(jsonForm)


    try {
        const result = await db.update(form).set({jsonForms :strJsonForm}).where(eq(form.id,id))
        

        if(!result){
            return Response.json({
                success : false,
                message : "form not found",
            },{status : 401})
        }

        

        return Response.json({
            success : true,
            message : "form finalized successfully",
        },{status : 200})

        
    } catch (error) {
        return Response.json({
            success : false,
            message : "error occurred while finalizing the form",
        },{status : 500})
    }


}