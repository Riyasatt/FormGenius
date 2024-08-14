'use client'

import { useStateStore } from '@/StateStore'

import { useToast } from '@/components/ui/use-toast'
import { form,fields } from '@/lib/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState,Suspense, useCallback } from 'react'
import { z } from 'zod'

import FinalForm from '@/components/custom/FinalForm'
import { Loader2 } from 'lucide-react'

const page = ({params}:{params : {formId: string}}) => {

  


  const {previewForm,setPreviewForm} = useStateStore()
  const[isGetting, setIsGetting]= useState(true)


    const {toast}= useToast()
    const router = useRouter()

    
    const [zodFormSchema, setZodFormSchema] = useState<z.ZodObject<any> >(z.object(({})))

    useEffect(() => {
  
      const getFormData = async () =>{
      
        try {
    
          setIsGetting(true)
          let schema = z.object({});
          const response = await axios.get(`/api/final-form/${params.formId}`)
          
    
          const data = JSON.parse(response.data.jsonForm)
  
          data.fields.forEach((field : fields) => {
            let fieldSchema: z.ZodSchema<any>;
            switch (field.type) {
              case 'text':
              case 'textarea':
                fieldSchema = z.string().min(2,{message :"at least 2 character"}); // Base schema for text and model
                break;
              case 'number':
                fieldSchema = z.number().positive(`${field.label} must be a positive number`).int();
                break;
              case 'tel':
                fieldSchema = z.number().min(1000000000,{message :'Phone Number must be  10 digits'}).max(9999999999,{message:"Phone Number must be of 10 digits"})
                break;
              case 'select':
              case 'radio':
                const options : [string] = [''];
                field.options?.forEach((opt,index)=>{
                  options[index] = opt.value
                })
                fieldSchema = z.enum(options)
                break;
              case 'email':
                  fieldSchema = z.string().email()
                  break;
              case 'checkbox':
                if(field.options){
                  fieldSchema =z.array(z.string()).default([''])
                }else{
                  fieldSchema = z.boolean()
                }
                break;
              case 'file':
                fieldSchema = z
                .string()
                break;
              default:
                console.warn(`Unsupported field type: ${field.type}`);
                fieldSchema = z.string().optional(); // Handle unsupported types as optional strings
            }
        
        
            // Call .shape on the schema object
            
    
            if(!field.required){
              schema = schema.extend({
                [String(field.name)] : fieldSchema.optional()
              })
            }else{
              schema = schema.extend({ [String(field.name)]: fieldSchema });
            }
          });
  
          setIsGetting(false)
          setZodFormSchema(schema)
          setPreviewForm(data)
    
        } catch (error  ) {
          toast({
            title: "error",
            description : "Form not found",
            variant : "destructive",
          })
          router.replace('/')
        }
    
    
      }
  
      // const convertFieldsToSchema = async(fields: fields[]) => {
      //   let schema = z.object({}); // Initialize schema as a non-constant variable
      
      //   fields.forEach((field) => {
      //     let fieldSchema: z.ZodSchema<any>;
      //     switch (field.type) {
      //       case 'text':
      //       case 'select':
      //       case 'radio':
      //       case 'textarea':
      //         fieldSchema = z.string(); // Base schema for text and model
      //         console.log('string')
      //         break;
      //       case 'number':
      //       case 'tel':
      //         fieldSchema = z.number().positive(`${field.label} must be a positive number`).int();
      //         break;
      //       case 'email':
      //           fieldSchema = z.string().email()
      //           break;
      //       case 'checkbox':
      //         fieldSchema = z.boolean()
      //       case 'file':
      //         fieldSchema = z.string(); // Assuming validation for uploaded image is handled elsewhere
      //         break;
      //       default:
      //         console.warn(`Unsupported field type: ${field.type}`);
      //         fieldSchema = z.string().optional(); // Handle unsupported types as optional strings
      //     }
      
      
      //     // Call .shape on the schema object
          
  
      //     if(!field.required){
      //       schema = schema.extend({
      //         [String(field.name)] : fieldSchema.optional()
      //       })
      //     }else{
      //       schema = schema.extend({ [String(field.name)]: fieldSchema });
      //     }
      //   });
      //   console.log(schema.shape)
      //   setZodFormSchema(schema)
      // };
      getFormData()
  
      
      
    }, [])



    
  return (
    <div className='container mb-20'>
      {isGetting ? <div>
        
      </div> :
        <FinalForm formId={params.formId} schema={zodFormSchema}  />
}
    </div>
  )
}

export default page