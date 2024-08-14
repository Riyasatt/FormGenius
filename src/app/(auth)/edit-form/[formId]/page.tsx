'use client'

import FormUI from '@/components/custom/FormUI';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import {  ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { apiResponse, fields, form } from '@/lib/types'
import FormSkeleton from '@/components/custom/FormSkeleton';
import { Button } from '@/components/ui/button';
import { useStateStore } from '@/StateStore';

const page = ({params} : {params : {formId : string}}) => {
  
  const {jsonForm,setJsonForm}= useStateStore()
  const[isGetting, setIsGetting]= useState(true)
  const[isFinalizing, setIsFinalizing]= useState(false)
  const {toast} = useToast()
  const router = useRouter()

  const id =params.formId

  const getFormData = async () =>{
    
    try {

      setIsGetting(true)
      const response = await axios.get(`/api/get-form/${params.formId}`)
      setIsGetting(false)

      setJsonForm(JSON.parse(response.data.jsonForm))
     


    } catch (error  ) {
      toast({
        title: "error",
        description : "Form not found",
        variant : "destructive",
      })
      router.replace('/dashboard')
    }


  }

  const finalize = async ()=>{
    setIsFinalizing(true)

    try{
      const response = await axios.post(`/api/finalize-form`,{jsonForm,id})

      setIsFinalizing(false)

      console.log(response)

      router.replace(`/dashboard`)

    }catch(error){
      toast({
        title: "error",
        description : "Error while finalizing your form",
        variant : "destructive",
      })
      
    }

  }

   useEffect(() => {
    getFormData()

   }, [])
   

  

  return (
    <div className='container mt-6 md:mt-10  ' >
      <div className='flex items-center justify-between mb-3 md:mb-10 sticky top-[72px] bg-slate-950 z-30 py-5 w-full'>
      <Button variant='ghost' onClick={()=> router.back()} className='flex items-center cursor-pointer '><ArrowLeft /> Back</Button>
      <div className='flex items-center gap-x-2'>
        <Button disabled={isGetting || isFinalizing} className='' variant='outline' onClick={()=>{getFormData()}}>Reset</Button>
        <Button onClick={()=>finalize()} disabled={isGetting || isFinalizing} className='bg-btn text-white'>Finalize</Button>
      </div>
      </div>

      {isFinalizing && 
      <div className='fixed z-50 left-0 w-full h-[calc(100vh-72px)] text-center gap-5 top-[72px] text-white/50 flex-wrap  flex justify-center items-center bg-black/80 '>
        <div><Loader2 className='animate-spin' size={100} /></div>
        <div className='text-2xl'>Finalizing</div>
      </div>

    }

      {isGetting ? 
          <FormSkeleton/> : 
          <div className='mb-20'>
        <FormUI   />
      </div>
    }
      
      </div>
  )
}

export default page