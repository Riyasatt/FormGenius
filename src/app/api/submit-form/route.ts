import { db } from "@/config"
import { userResponses } from "@/config/schema"
import { and, eq } from "drizzle-orm"
import moment from "moment"

type userResponse = typeof userResponses.$inferInsert

export async function POST(request: Request){
    const {formId,responseData} = await request.json()


    const SubmittedFormId = Number(formId)
    const userResponseData =  JSON.stringify(responseData)

    const ResponseAt = moment().format('DD/MM/YYYY')

    const newData : userResponse = {
        responseAt : ResponseAt,
        response : userResponseData,
        formId : SubmittedFormId,
    }

    try {
        
        const result = await db.insert(userResponses).values(newData).returning({id:userResponses.id})

        if(!result){
            return Response.json({
                success : false,
                message : "failed to add response to the database",
            },{status : 500})
        }

        return Response.json({
            success : true,
            message : "successfully generated yur form",
        },{status : 200})
    } catch (error) {
        return Response.json({
            success : false,
            message : "error occurred",
        },{status : 500})
    }
   
}