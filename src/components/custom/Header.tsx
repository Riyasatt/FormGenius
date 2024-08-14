'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { AlignJustify } from 'lucide-react'
import { useStateStore } from '@/StateStore'

const Header = () => {

  const {setIsSideNav, isSideNav} = useStateStore();
  const {user , isSignedIn} = useUser()
  const pathname = usePathname()
  const notHeaderSites = [
    "/sign-in",
    "/sign-up"
  ]
  return (
    <div className={`shadow-lg h-[72px] sticky top-0 py-5 px-5 z-50  ${pathname === '/' ? "bg-slate-950" : "bg-slate-900" }  top-0 ${notHeaderSites.indexOf(pathname) > -1 ? "hidden" : "block" }`}>
        <div className='  flex items-center justify-between '>
        <div  className={`flex items-center gap-x-2 bg-transparent  `}>
      <div 
      onClick={()=>setIsSideNav(!isSideNav)} 
      className='text-xl block lg:hidden bg-transparent relative top-1 mr-2 cursor-pointer text-gray-400  rounded'  >
        {(isSignedIn && pathname.startsWith('/dashboard')) && <AlignJustify />}
      </div>
      <Link href={'/'} className={`flex items-center  `}>
      <div >
        <Image className={`${isSignedIn ? "hidden md:mr-2 lg:block" : "mr-2"}`} src={'/logo.png'} height={25} width={25} alt='logo' />
       </div>
      <div className='lg:text-2xl relative top-1  font-extrabold text-blue-400'>Form<span className='text-white'>Genius</span> </div>
      </Link>
  </div>
            {isSignedIn ?
              <div className='flex items-center gap-x-2  '>
                <Button variant='outline' className={`text-purple-300 bg-transparent ${pathname.startsWith('/dashboard') ? "hidden" : "block"}` }><Link href='/dashboard'> Dashboard </Link></Button>
              </div> :  
              <SignInButton>
                <Button size="sm" className='bg-btn text-white'>Get Started</Button>
              </SignInButton>         
          }
            
        </div>
  </div>
  )
}

export default Header