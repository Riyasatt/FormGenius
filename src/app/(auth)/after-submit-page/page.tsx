import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='container  '>
        <div className=' py-10 bg-slate-900 mt-10 px-5 rounded-lg'>
        <div className='text-3xl font-extrabold text-blue-500 mb-5'>
            Thank You for filling the Form
        </div>
        <div className=' text-xl font-bold mb-10'>Your Response has been recorded</div>
        <div>
            <Link href='/' className=' underline text-blue-500'>Create your own form </Link>
            with the help of AI

        </div>
        </div>
    </div>
  )
}

export default page