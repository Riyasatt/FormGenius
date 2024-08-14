'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import {  AlignJustify, LibraryBig, LineChart, Menu, MessagesSquare, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useStateStore } from '@/StateStore'
import { Button } from '../ui/button'

const SideNav = () => {


  const {isSideNav,setIsSideNav} = useStateStore()
  const path = usePathname()

  // const {user}= useUser()

  // const {setUsername}= useStateStore()

  // useEffect(() => {
  //   setUsername(String(user?.primaryEmailAddress?.emailAddress))
  // }, [])
  

  const sideNavList = [
    {
      id : 1,
      name : "My Forms",
      icon : LibraryBig,
      path : "/dashboard"
    },
    {
      id : 2,
      name : "Responses",
      icon : MessagesSquare,
      path : "/dashboard/responses"
    },
    
  ]

  
  return (
    <div className={`flex h-[calc(100vh-72px)] z-50  ${isSideNav ? "w-full sm:w-80 " : "w-0 lg:w-80"} overflow-hidden transition-all  text-white fixed  lg:sticky lg:top-[72px]   bg-slate-900 flex-col justify-between border-e `}>
  <div className="px-5 py-5">
  {/* <div  className={`flex items-center gap-x-2 bg-transparent md:hidden `}>
      <div className='text-xl bg-transparent relative top-1 mr-2 cursor-pointer text-gray-400  rounded' onClick={() => setSideNavVisible(!sideNavVisible)} >
        <AlignJustify />
      </div>
      <Link href={'/'} className='flex items-center gap-x-2'>
      <div >
        <Image src={'/logo.svg'} height={25} width={25} alt='logo' />
       </div>
      <div className='lg:text-2xl relative top-1  font-extrabold text-purple-500'>Form<span className='text-white'>Genius</span> </div>
      </Link>
  </div> */}

  <div className='flex flex-col mt-5 '>
    {sideNavList.map((item)=>(
      // <Button className=''>
      <Link onClick={()=>setIsSideNav(false)} key={item.id} href={item.path} className={`flex items-center gap-x-4   lg:text-lg rounded-lg  px-4 py-4  font-medium ${path === item.path ? "bg-gray-200/20" : "hover:bg-gray-200/10"} text-gray-400 `}>
        <item.icon />
        
          {item.name}
        </Link>
      // </Button>
    ) )}
  </div>


      {/* <li>
        <a
          href="#"
          className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          General
        </a>
      </li> */}

      
  </div>

  <div className='flex items-center px-5 py-5 bg-gray-300/10 text-white  '>
    <UserButton
    appearance={{
      elements: {
        userButtonBox: {
          flexDirection: "row-reverse",
        },
        
      },
    }}
     showName  />
  </div> 
</div>
  )
}

export default SideNav