import { useStateStore } from '@/StateStore';
import { fields, form } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ZodSchema, z } from 'zod';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const FinalForm = ({schema, formId } :{schema: z.ZodObject<any>, formId :string}) => {

  

  const {previewForm,setPreviewForm} = useStateStore()

  const {toast} = useToast()
  const router = useRouter()
  

  const customForm = useForm<z.infer <typeof schema>>({
    resolver : zodResolver(schema)
  })

  const onSubmit =async (values: z.infer<typeof schema>)=>{

    try {
      const response = await axios.post('/api/submit-form',{responseData : values,formId : formId})

      toast({
        variant : "success",
        title : "Form Submitted successfully"
      })
      router.replace('/after-submit-page')

    } catch (error) {
      toast({
        variant : "destructive",
        title : "Error occurred"
      })
    }
    toast({
      variant : "success",
      title : "Form Submitted successfully"
    })
    
  }
  
    


  return (
    <div >
        <div className='py-10'>
          <div className="text-3xl px-4 md:text-4xl lg:text-5xl font-extrabold mt-5 mb-1 text-blue-500">
            {previewForm.title}
          </div>
          <div className=" text-sm px-4 md:text-medium lg:text-lg mb-2 text-white/50">
            {previewForm.description}
          </div>
        </div>
        <Separator />
      <Form {...customForm}>
      <form onSubmit={customForm.handleSubmit(onSubmit)} onReset={customForm.handleSubmit(()=>{})} className="space-y-8">
        {previewForm.fields.map((fields,index)=>{
          
              return (
                <FormField
              control={customForm.control}
              name={fields.name}
                
              key={index}
              
              render={({ field }) => (
                <FormItem className={`px-4 md:px-6 py-10  ${
                  fields.type === "submit" && "hidden" 
                }  rounded-lg  mt-4  bg-slate-900 `}>
                  {((fields.type !=='checkbox' || fields.options) && fields.type !== 'submit') && <FormLabel className='text-lg'>{fields.label }<span className='text-red-400'>{fields.required && " *"}</span></FormLabel>}
                  <div className='pt-3'></div>
                  <FormControl>
                    <>
                    {(fields.type === 'text' || fields.type === 'email' || fields.type === 'textarea' || fields.type === 'file' ) &&
                    <Input className={`${
                      fields.type !== "file" && "py-6"
                    } focus-visible:ring-offset-0 focus-visible:ring-0  w-full lg:w-2/4 bg-transparent border-t-0 border-r-0 border-l-0 rounded-none  border-b border-blue-500/50 focus:outline-blue`} type={fields.type} placeholder={fields.placeholder} {...field} />
                  }
                  {
                    (fields.type === 'tel' || fields.type === 'number') &&
                    <Input className={`py-6 focus-visible:ring-offset-0 focus-visible:ring-0  w-full lg:w-2/4 bg-transparent border-t-0 border-r-0 border-l-0 rounded-none  border-b border-blue-500/50 focus:outline-blue`} type={fields.type === 'tel' ? 'number':fields.type} onChange={(e)=> field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}  placeholder={fields.placeholder}  />
                  }
                  {
                    fields.type === 'select' &&
                    <Select  onValueChange={field.onChange} >
                     <SelectTrigger className="w-full sm:w-60 bg-transparent">
                       <SelectValue placeholder="select" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectGroup>
                         {fields.options?.map((option, index) => (
                           <SelectItem key={index} value={option.value}>
                             {option.label}
                           </SelectItem>
                         ))}
                       </SelectGroup>
                     </SelectContent>
                   </Select>
                  }
                  {
                    fields.type === 'radio' &&
                    <RadioGroup
                    className="bg-transparent space-y-6"
                    onValueChange={field.onChange}
                  >
                    {fields.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          className=""
                          value={option.value}
                          id="r1"
                        />
                        <Label>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  }
                  {
                    (fields.type === 'checkbox' && fields.options ) &&
                    <div className="space-y-5" {...field}>
                      {fields.options.map((option,index)=>{
                        return (
                          <div key={index} className='flex items-center space-x-2' >
                           <Checkbox
                                checked={Array.isArray(field.value) && field.value.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    const currentValues = customForm.getValues(`${fields.name}`)
                                    customForm.setValue(`${fields.name}`, [option.value])
                                  } 
                                }}
                              />
                            <Button type='button' className='bg-transparent text-white hover:bg-transparent'>{option.label}</Button>
                          </div>
                        )
                      })}
                    </div>
                  }

                  {
                    (fields.type === 'checkbox' && !fields.options ) &&
                    <div className="flex items-center space-x-2">
                      <Checkbox
                      className="bg-transparent"
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {fields.label}
                    </label>
                    </div>
                  }
                  {fields.type === 'submit' && <div className=''></div> }
                  </>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          )
    
        })}
        
        <Button type="submit" className='bg-btn text-white font-bold'>Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default FinalForm