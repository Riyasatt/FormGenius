'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'



const Hero = () => {

  const router = useRouter()


  return (
    <section className=" text-white bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat  bg-blend-screen bg-slate-950 ">
  <div className="mx-auto max-w-screen-xl px-4 md:py-56 lg:flex py-32  lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl md:text-6xl"
      >
        Create Your Form

        <div className="sm:block"> In Seconds Not In Hours </div>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          onClick={()=> router.replace('/dashboard')}
          className="w-full rounded border bg-btn text-white sm:w-auto  p-6 px-12"
        >
          + Create AI Form
        </Button>

        <Button
          variant='outline'
          className='w-full  rounded border text-white sm:w-auto  p-6 px-16'
        >
          Learn More
        </Button>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero