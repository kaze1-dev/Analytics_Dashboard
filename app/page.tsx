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
    <div className='h-screen flex justify-center items-center'>
      <div className=' transition-all rounded-xl px-20 pb-15 pt-10 flex flex-col jsutify-center items-center gap-4 '>
        <Aperture size={70} className='text-blue-700' />
        <h1 className='text-6xl flex flex-col gap-1 text-center font-bold tracking-wide '>
          <span className='text-neutral-300'>Think, plan and track</span>
          <span className='text-neutral-400'>All in one place</span>
        </h1>
        <p className='text-sm tracking-wide font-semibold text-neutral-400'>
          Efficiently manage your business and boost your revenue
        </p>
        <div className='flex gap-8 mt-8'>
          <Link href="/auth/login">
            <button className='bg-blue-800 hover:bg-blue-700 transition-all text-neutral-300  font-bold px-8 rounded-lg py-2 cursor-pointer'>Sign In</button>
          </Link>
          <Link href="/auth/register">
            <button className='border border-blue-700 hover:bg-blue-700/10 transition-all px-8 rounded-lg py-2 font-bold text-blue-700 cursor-pointer'>Register</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dash