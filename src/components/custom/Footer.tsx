import { Heart, HeartOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between">
      <div className="flex justify-center text-teal-600 sm:justify-start dark:text-teal-300">
      <Link href={'/'} className={`flex items-center  `}>
      <div >
        <Image className={` "hidden md:mr-2 lg:block" : "mr-2"}`} src={'/logo.png'} height={25} width={25} alt='logo' />
       </div>
      <div className='lg:text-2xl relative top-1  font-extrabold text-blue-400'>Form<span className='text-white'>Genius</span> </div>
      </Link>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500 items-center lg:mt-0 lg:text-right gap-1 flex dark:text-gray-400">
        Made with  <Heart className='text-red-500' size={20}/> by
        <Link href='https://github.com/Riyasatt/FormGenius' target='_blank' className='underline'>Riyasat</Link>
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer