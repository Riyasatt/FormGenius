import { Atom, Share, Share2, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HowItWorks = () => {
  return (
    <section className="bg-slate-950/50 backdrop-blur-md text-white my-5">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">How It <span className='text-blue-500'>Works</span> </h2>

      <p className="mt-4 text-gray-300/60">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus
        nesciunt eos fugiat. Vitae aperiam fugit consequuntur saepe laborum.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="block rounded-xl cursor-default border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-blue-500/10"
      >
       <Atom size={30} className='text-blue-500' />

        <h2 className="mt-4 mb-2 text-xl font-bold text-white">Write Prompt for your Form</h2>

        <p className="mt-1 text-sm text-gray-300/60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
          distinctio alias voluptatum blanditiis laudantium.
        </p>
      </div>

      <div
        className="block rounded-xl cursor-default border border-gray-800 p-8 shadow-xl transition  hover:shadow-blue-500/10"
      >
       <SquarePen size={30} className='text-blue-500' />

        <h2 className="mt-4 mb-2 text-xl font-bold text-white">Edit the Form</h2>

        <p className="mt-1 text-sm text-gray-300/60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
          distinctio alias voluptatum blanditiis laudantium.
        </p>
      </div>

      <div
        className="block rounded-xl cursor-default border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-blue-500/10"
      >
       <Share2 size={30} className='text-blue-500' />

        <h2 className="mt-4 mb-2 text-xl font-bold text-white">Share it or Integrate the form with Google Forms</h2>

        <p className="mt-1 text-sm text-gray-300/60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
          distinctio alias voluptatum blanditiis laudantium.
        </p>
      </div>

      
    </div>

    <div className="mt-12 text-center">
      <Link
        href="/dashboard"
        className="inline-block rounded bg-btn px-12 py-3 text-sm font-medium text-white transition  focus:outline-none focus:ring focus:ring-yellow-400"
      >
        Get Started Today
      </Link>
    </div>
  </div>
</section>
  )
}

export default HowItWorks