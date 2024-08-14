
import { db } from "@/config";
import { chatSession } from "@/config/AIModal";
import { form } from "@/config/schema";
import moment from "moment";
import { EXAMPLE, PROMPT } from "../../../../constants/constant";
import { and, eq } from "drizzle-orm";



type Data = typeof form.$inferInsert


export async function POST(request: Request){

    const {userPrompt,user} = await request.json()
    const createdBy = user
    const createdAt = moment().format('DD/MM/YYYY')
    const dateAndTime = new Date()
    const createdTime = dateAndTime.getHours() +":"+ dateAndTime.getMinutes() + ":" +dateAndTime.getSeconds()

    try{
        const result = await chatSession.sendMessage("description : "+ userPrompt+ PROMPT + "this is the example output give output in this format" + EXAMPLE )

        const jsonForm = result.response.text().replace(/```|```json/g,"")


        const newData : Data = {
            prompt :userPrompt,
            jsonForms : jsonForm,
            createdBy : createdBy,
            createdOn: createdAt,
            createdTime : createdTime
        }

        const res =await db.insert(form)
        .values(newData)
        .returning({id:form.id})

        if(!result){
            return Response.json({
                success : false,
                message : "failed to generate your form",
            },{status : 500})
        }

        return Response.json({
            success : true,
            message : "successfully generated yur form",
            jsonForm : result?.response.text(),
            id : res[0].id
        },{status : 200})

    }catch(error){
        return Response.json({
            success : false,
            message : "error occurred while generating form",
        },{status : 500})
    }
}

