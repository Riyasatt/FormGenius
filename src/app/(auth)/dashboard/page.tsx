'use client'

import CreateForm from '@/components/custom/CreateForm'
import FormCard from '@/components/custom/FormCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { form } from '@/config/schema'
import { dataTable } from '@/lib/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const page = () => {

  const [allData,setAllData]= useState<[dataTable]>([{}])
  const [isLoading,setIsLoading] = useState(true)


  const getForms = async()=>{
    setIsLoading(true)

    try {
      const response = await axios.get(`/api/get-form`)


      setIsLoading(false)
      const data= response.data.allInfo
      const sortArray = (d1 : dataTable,d2 : dataTable)=>{
        return( d1.id! - d2.id!)
      }
      data.sort(sortArray)
      data.reverse()
      setAllData(data)

    } catch (error) {
      
    }
  }

  useEffect(() => {
    getForms();
  }, [])
  
  return (
    <div className=''>
      <div className='flex w-full items-center justify-between bg-slate-950 py-5 z-30 sticky top-[72px]'>
        <div className=' text-2xl md:text-4xl lg:text-5xl font-extrabold   text-blue-500'>
          <div className='flex items-center gap-2'>
          Dashboard
          <Button onClick={()=>getForms()} variant='ghost' className='text-white p-1' >
            <RefreshCcw  className={`${isLoading && "animate-spin rotate-180"}`} />
          </Button>
          </div>
          <div className=' hidden sm:block text-sm md:text-base font-normal text-white/50 mt-3'>
          The Form you created will be shown here
        </div>
        </div>
        <div>
          <CreateForm />
        </div>
      </div>
      <Separator />
      <div className='mt-5 md:mt-10'>

        {isLoading ? 
        <div className='flex flex-wrap gap-5'>
        <Skeleton className='w-full md:w-[600px] h-60' />  
        <Skeleton className='w-full md:w-[600px] h-60' />  
        </div>
        : allData.length < 1?
        <div className='w-full justify-center  text-center gap-x-2 mt-20'>
          <div className='font-bold'>
            Create Your First Form
          </div>
          <div className=''>
          <CreateForm />
        </div>
          
        </div>
        :
        <div className='flex flex-wrap gap-4'>
          {allData.map((data,index)=>{
            return <FormCard key={index}  data={data} />
          })}
        </div>
      }

      </div>
    </div>
  )
}

export default page