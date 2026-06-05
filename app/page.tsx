import { authOptions } from '@/auth';
import { Aperture } from 'lucide-react'
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'


const Dash = async () => {
  const session = await getServerSession(authOptions);
  if(session) {
    redirect('/home')
  }
  return (
    <div className='min-h-screen w-full flex justify-center items-center p-4 bg-neutral-950 overflow-x-hidden overflow-y-hidden'>
  <div className='w-full max-w-md transition-all rounded-xl flex flex-col justify-center items-center gap-4 sm:gap-6 overflow-x-hidden overflow-y-hidden'>
 
    <Aperture className='text-indigo-600 w-12 h-12 sm:w-17.5 sm:h-17.5' />
    

    <h1 className='text-2xl sm:text-3xl md:text-4xl flex flex-col gap-1 text-center font-bold tracking-wide'>
      <span className='text-neutral-300'>Think, plan and track</span>
      <span className='text-neutral-400'>All in one place</span>
    </h1>
    
    
    <p className='text-xs sm:text-sm text-center tracking-wide font-semibold text-neutral-400 max-w-sm'>
      Efficiently manage your business and boost your revenue
    </p>
    
     
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8 w-full sm:w-auto px-4 sm:px-0'>
      <Link href="/auth/login" className='w-full sm:w-auto'>
        <button className='w-full bg-indigo-600 active:bg-indigo-500 transition-all text-neutral-300 font-bold px-8 py-2.5 rounded-lg cursor-pointer whitespace-nowrap'>
          Sign In
        </button>
      </Link>
      <Link href="/auth/register" className='w-full sm:w-auto'>
        <button className='w-full border border-indigo-600 hover:bg-blue-700/10 transition-all px-8 py-2.5 rounded-lg font-bold text-indigo-500 cursor-pointer whitespace-nowrap active:bg-indigo-600/20'>
          Register
        </button>
      </Link>
    </div>
  </div>
</div>
  )
}

export default Dash