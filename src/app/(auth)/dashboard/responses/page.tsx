'use client'

import UserResponseCard from '@/components/custom/UserResponseCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { form } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'



interface Response {
  formId: number;
  response: string;
  responseAt: string;
  responseBy: string;
  form : string ,
  jsonForm : form
}

interface GroupedResponses {
  [formId: number]: Response[];
}

const page = () => {

  const [userResponses,setUserResponses]= useState<GroupedResponses>({})
  const [isGetting,setIsGetting]= useState(true)

  const groupByFormId = (responses : Response[]) : GroupedResponses =>{
    return responses.reduce((acc : GroupedResponses, response : Response) => {
      const {formId} = response
      if(!acc[formId]){
        acc[formId ] = []
      }
      acc[formId].push(response);
      return acc;
    },{})
  }

  

  const getResponses = async()=>{

    setIsGetting(true)
    const response = await axios.get('/api/get-user-response')


     response.data.userResponse.map((res : Response)=> { 
      
        res.jsonForm = JSON.parse(res.form)
      
      res.response = JSON.parse(res.response)

    })

    // console.log(response.data.userResponse);

    

    const groupedResponse = groupByFormId(response.data.userResponse)

    setIsGetting(false)
    setUserResponses(groupedResponse)

    // console.log(response.data.userResponse);
  }

    useEffect(() => {
      getResponses()
    }, [])


    
  return (
    <div className='mt-5  '>
      <div className=' text-3xl md:text-4xl lg:text-5xl font-extrabold   text-blue-500'>
        <div className='flex items-center gap-2'>

        Responses
        <Button onClick={()=>getResponses()} variant='ghost' className='text-white p-1' >
            <RefreshCcw  className={`${isGetting && "animate-spin rotate-180"}`} />
          </Button>
        </div>
      </div>
      {isGetting && 
        <div className='mt-10 space-y-5'>
          <Skeleton className='w-full  h-40' />
          <Skeleton className='w-full  h-40' />
        </div>
      }
      <Accordion type="multiple"  className="w-full overflow-x-scroll ">
        {
          Object.keys(userResponses).map((formId , index) =>{
            return (
              <AccordionItem value={`item-${index+1}`} key={index} className='   my-5 w-full '> 
              <AccordionTrigger className=''>
                <div>
              <div className='text-xl text-blue-500 mt-5 mb-2 font-extrabold'>

                {userResponses[Number(formId)][0].jsonForm.title}
              </div>
                <div className =' text-lg mb-4'>
                  Total Responses : {userResponses[Number(formId)].length}
                </div>
                </div>
                </AccordionTrigger>

                <AccordionContent className=' '>
                  <ScrollArea className=' '>
                 <Table className=' overflow-x-scroll ' >
                 <TableHeader className='bg-slate-900 rounded-lg'>
                      <TableRow>
                        {Object.keys(userResponses[Number(formId)][0].response).map((field, index) => <TableHead className='' key={index}>{field}</TableHead>)}
                      </TableRow>
                    </TableHeader>
                     <TableBody>
                        {userResponses[Number(formId)].map((singleUserResponse) => {
                          return (
                            <TableRow>
                              {Object.keys(singleUserResponse.response).map((data : any) =>
                              <TableCell className=' '>{singleUserResponse.response[data]}</TableCell>
                              )}
                            </TableRow>
                          )
                        })}
                     </TableBody>
                 </Table>
                 </ScrollArea>
                 </AccordionContent>
                 
              </AccordionItem>
            )
          })
        }

      </Accordion>
      
    </div>
  )
}

export default page