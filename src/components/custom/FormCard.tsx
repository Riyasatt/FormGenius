import { dataTable, form } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Eye, Loader, Loader2, Share, Share2, SquareArrowOutUpRight, SquareArrowUpRight, SquarePen, Trash } from 'lucide-react'
import Link from 'next/link'

import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'
import axios from 'axios'
import { Input } from '../ui/input'



const FormCard = ({data}:{data : dataTable}) => {

  const router = useRouter()
  const {toast} = useToast()
  const [isIntegrating,setIsIntegrating]= useState(false)
  
  let form : form={
    title:"",
    description:"",
    fields:[{name:""}]
  }
  let formId = data.id

  if(data.jsonForms){
     form = JSON.parse(data.jsonForms)
  }

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const previewLink = '/ai-form/' + data.id

   function previewButton (){
    router.replace(previewLink)
    
  }

  const copyToClipboardPreviewLink = async() => {
    navigator.clipboard.writeText(`${baseUrl}${previewLink}`);
    toast({
      variant: "success",
      title: 'URL Copied!',
      description: 'Form URL has been copied to clipboard.',
    })
  }

  const copyToClipboardGoogleLink = async() => {
    navigator.clipboard.writeText(`${data.googleLink}`);
    toast({
      variant: "success",
      title: 'Google Form  Link Copied!',
    })
  }

  const createGoogleForm = async()=>{
    setIsIntegrating(true)
    try {
      const response = await axios.post('/api/create-google-form',{jsonForm : form , formId})

      setIsIntegrating(false)
    
      toast({
        variant: "success",
        title: 'Form Integrated',
        description: response.data.message,
      })
      window.location.reload();

    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Form Integration failed',
      })
    }finally{
      setIsIntegrating(false)
    }


  }




  
  
  return (
    <Card className='w-full md:w-[600px] relative flex flex-col justify-between '>
      <div>
      
    <CardHeader>
      <CardTitle className='text-blue-500 font-extrabold flex flex-wrap  justify-between items-center'>
        <div className='flex-1'>{form.title} </div>
        { !data.integrated && <Button disabled={isIntegrating} onClick={()=>createGoogleForm()} size='lg' variant='secondary' className=' text-white my-3 md:my-0 '>{!isIntegrating ? <div className='flex items-center justify-center'><div className='hidden md:block'> Integrate with &nbsp;</div> <Image width={15} height={15} className='w-auto h-auto'  src='/form.png' alt='forms'/></div> : <div className='flex items-center gap-x-2'><Loader2 className='animate-spin' /> Integrating</div> }</Button>}</CardTitle>
      <CardDescription className=''>{form.description}</CardDescription>
    </CardHeader>
    <CardContent>
      
      <div className='text-sm'>
        Created On : <span className='text-white/50'>{data.createdOn}</span>
      </div>
      
      <div className='text-sm'>
        Created At : <span className='text-white/50'>{data.createdTime}</span>
      </div>
      {data.integrated && 
        <div className='mt-5  rounded-lg '>
          <div className='flex items-center mb-3 '>
         <Input type="text"
            value={data.googleLink}
            disabled
            className="input input-bordered text-white/80  bg-slate-900/50 rounded w-full p-2 mr-2"
           />
          <Button onClick={()=>copyToClipboardGoogleLink()} className='font-bold bg-btn text-white' >Copy</Button>
          </div>
          <div className='flex items-center gap-x-3 '>
          <Link href={`https://docs.google.com/forms/d/${data.googleFormId}/edit`} className='flex-1' target='_blank'><Button variant='secondary' className='w-full font-bold gap-x-2 '><SquarePen /> Edit in Forms</Button></Link>
          <Link href='https://docs.google.com/forms' className='flex-1' target='_blank' ><Button variant='secondary' className='w-full font-bold gap-x-2 '><SquareArrowOutUpRight /> Forms</Button></Link>
          </div>
        </div>  
      }
    </CardContent>
    </div>
    <CardFooter>
      <div className='flex items-center justify-between gap-x-4 w-full'>
        <div className='flex items-center gap-x-3'>
          <Link href={`/edit-form/${data.id}`}>
          <Button  className='bg-btn text-white font-bold flex gap-x-2 items-center'><SquarePen /> Edit</Button>
          </Link>
          
          {/* <Button  className='bg-transparent  text-red-500 hover:bg-transparent font-bold flex gap-x-2 items-center'><Trash /></Button> */}
          
        </div>
        <div className='flex items-center'>
          {/* <Link target='_blank' href={previewLink}> */}
        <Button onClick={()=>previewButton()} variant='outline' className=' text-white/70 bg-transparent hover:border-white font-bold flex gap-x-2 items-center'><Eye />Preview</Button>
        {/* </Link> */}
        <Button onClick={()=>copyToClipboardPreviewLink()} className='text-white/70' variant='ghost'><Share2 /></Button>
        </div>
      </div>
    </CardFooter>

  </Card>
  )
}

export default  FormCard