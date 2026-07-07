import React from 'react'
import Link from 'next/link'
import { Aperture } from 'lucide-react'

const Dash = async () => {
  return (
    <div className='min-h-screen w-full flex justify-center items-center p-6 bg-neutral-950 selection:bg-neutral-800 selection:text-neutral-100'>
      <div className='w-full max-w-md flex flex-col justify-center items-center text-center gap-6'>
        <div className='p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-2xl text-neutral-300 shadow-2xl shadow-black/50 backdrop-blur-xs'>
          <Aperture size={24} className='tracking-tight' />
        </div>
        <div className='space-y-2.5'>
          <h1 className='text-3xl sm:text-4xl font-black tracking-tight flex flex-col leading-[1.15]'>
            <span className='text-neutral-100'>Think, plan and track</span>
            <span className='text-neutral-500'>All in one place.</span>
          </h1>
          <p className='text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto font-medium leading-relaxed tracking-wide'>
            Efficiently manage your business engine and scale up your revenue generation performance.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto px-4 sm:px-0'>
          <Link href="/auth/login" className='w-full sm:w-auto'>
            <button className='w-full sm:min-w-[130px] bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap'>
              Sign In
            </button>
          </Link>
          <Link href="/auth/register" className='w-full sm:w-auto'>
            <button className='w-full sm:min-w-[130px] bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-xl font-bold px-6 py-2.5 text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap'>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dash