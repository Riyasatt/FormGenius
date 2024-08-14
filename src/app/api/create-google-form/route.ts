import { db } from '@/config';
import { fields } from '@/lib/types';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import {forms_v1} from '@googleapis/forms'
import { google } from 'googleapis';
import { form } from "@/config/schema"
import { eq } from 'drizzle-orm';

export async function POST(request:Request){

    const {jsonForm,formId} = await request.json()


    const { userId } = auth();
    const provider = 'oauth_google'

    try {
        if(userId){
            const response = await clerkClient.users.getUserOauthAccessToken(userId, provider);
            

            if(!response){
                return Response.json({
                    success : false,
                    message : "User Token not Found",
                },{status : 404}) 
            }


            
            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: response.data[0].token });


            const forms = google.forms({ version: 'v1', auth }) as forms_v1.Forms;

            //removing submit button from array

             jsonForm.fields.pop()  

             const fieldsAfterRemovingFileUploadField = jsonForm.fields.filter((field : fields) => field.type !== 'file')
            

            const fields = fieldsAfterRemovingFileUploadField.map((field : fields, index: number)=> {

                if(field.type === 'text' || field.type === 'textarea' || field.type === 'number' || field.type === 'tel' || field.type === 'email'){
                    return {
                        title : field.label,
                        questionItem : {
                            question : {
                                required : field.required,
                                textQuestion : {
                                    paragraph :false
                                }
                            }
                        }
                    }
                }

                if(field.type === 'select'){
                    return {
                        title : field.label,
                        questionItem :{
                            question :{
                                required : field.required,
                                choiceQuestion :{
                                    type : 'DROP_DOWN',
                                    options : field.options?.map((option)=> ({value : option.label}) )
                                }
                            }
                        }
                    }
                }

                if(field.type === 'date'){
                    return {
                        title : field.label,
                        questionItem :{
                            question :{
                                required : field.required,
                                dateQuestion :{
                                    includeTime : false,
                                    includeYear :true
                                }
                            }
                        }
                    }
                }
                if(field.type === 'radio'){
                    return {
                        title : field.label,
                        questionItem :{
                            question :{
                                required : field.required,
                                choiceQuestion :{
                                    type : 'RADIO',
                                    options : field.options?.map((option)=> ({value : option.label}) )
                                }
                            }
                        }
                    }
                }

                if(field.type === 'checkbox'){
                    return {
                        title : field.label,
                        questionItem :{
                            question :{
                                required : field.required,
                                choiceQuestion :{
                                    type : 'CHECKBOX',
                                    options : [
                                        {value : 'agree'}
                                    ]
                                }
                            }
                        }
                    }
                }
                
            }
                
                
            
        
        )

            
            

            const createdForm = await forms.forms.create({  
                requestBody :{
                    info :{
                        title : jsonForm.title,
                        documentTitle  : jsonForm.title
                    }
                }
            })

            const generatedFormId = createdForm.data.formId

            
            const batchUpdateResponse = await forms.forms.batchUpdate({
                formId: generatedFormId!,
                requestBody : {
                    requests: [
                        {
                            updateFormInfo :{
                                info : {
                                    title : jsonForm.title,
                                    description : jsonForm.description,
                                    documentTitle : jsonForm.title
                                },
                                updateMask : 'title,description'

                            }
                        },
                         fields.map((field : fields, index : number) => ({
                            createItem: {
                                item: field,
                                location: {
                                    index,
                                },
                            },
                        })),
                        
                    ]
                }
            })

            if(!batchUpdateResponse){
                return Response.json({
                    success : false,
                    message : "form created but all the fields were not updated",
                },{status : 401}) 
            }

            const dbResponse = await db.update(form).set({integrated : true , googleLink : createdForm.data.responderUri!,googleFormId : createdForm.data.formId!}).where(eq(form.id,formId))

            if(!dbResponse){
                return Response.json({
                    success : false,
                    message : "unable to update integrated status on our server",
                },{status : 401}) 
            }

            return Response.json({
                success : true,
                message : "form integrating successfully with google forms ",
                link : createdForm.data.responderUri,
                googleFormID : createdForm.data.formId
            },{status : 200}) 
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            success : false,
            message : "User Token not Found",
        },{status : 404}) 
    }

}