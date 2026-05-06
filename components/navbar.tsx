"use client";
import React from 'react'
import { HiHome } from 'react-icons/hi2'
import { HiChartBar } from 'react-icons/hi2'
import { HiShoppingCart } from 'react-icons/hi2'
import { HiCreditCard } from 'react-icons/hi2'
import { HiCog } from 'react-icons/hi'
import { HiInformationCircle } from 'react-icons/hi2'
import { HiUsers } from 'react-icons/hi2'
import { HiSquare3Stack3D } from 'react-icons/hi2'
import { useSession } from 'next-auth/react'
import Link from 'next/link';

const Navbar = () => {
  const {data: session, status} = useSession();
  const email = session?.user?.email;
  const formattedEmail = email?.split("@")[0] || "user";
  return (
    <div className='ml-3'>
      <nav className='bg-neutral-950 w-46 justify-between px-5 fixed top-3 bottom-3 flex flex-col py-5 font-sans rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all cursor-default'>
        <div className='flex flex-col'>
          <div className='flex gap-2 bg items-center mb-10 cursor-pointer'>

            <div className='text-2xl font-mono font-semibold'>
              <div className='bg-neutral-800 px-2.5 rounded relative text-neutral-300'>
                <div>#</div>
                <span className='absolute bg-green-500 border-full border-white w-2 h-2 rounded-full bottom-0 right-0'></span>

              </div>
            </div>
            <div className='flex flex-col'>
              <div className='text-xl  font-semibold text-neutral-300'>
                <span>{session?.user?.name}</span>

              </div>
              <div className='text-neutral-500 text-xs'>
                {formattedEmail}
              </div>
            </div>
          </div>
          <Link href="/home">
          <div className='bg-neutral-900 px-2 text-medium rounded-xl py-2 text-neutral-400 text-sm flex items-center gap-2 cursor-pointer hover:bg-neutral-900 mb-1'>
            <HiHome size={18} />
            <span className='font-semibold mt-0.5'>Home</span>
          </div>
          </Link>
          <Link href="/customer">
          <div className='text-sm flex items-center gap-2 font-semibold px-2 py-2 rounded-xl text-neutral-400 mb-1 cursor-pointer hover:bg-neutral-900 transition'>
            <HiUsers size={18} />
            <span className='mt-0.5'>Customers</span>
          </div>
          </Link>
          <div className='text-sm flex items-center gap-2 font-semibold px-2 py-2 rounded-xl text-neutral-400 cursor-pointer mb-1 hover:bg-neutral-900 transition'>

            <HiShoppingCart size={18} />
            <span className='mt-0.5'>Orders</span>
          </div>
          <div className='py-1'>
            <hr className='border-neutral-800' />
          </div>
          <div className='text-sm px-2 flex items-center text-medium py-2 rounded-xl text-neutral-400 gap-2 font-semibold cursor-pointer mb-1 hover:bg-neutral-900 transition'>
            <HiSquare3Stack3D size={18} />
            <span className='mt-0.5'>Products</span>
          </div>
          <div className='text-sm px-2 flex items-center text-medium py-2 rounded-xl text-neutral-400 gap-2 font-semibold cursor-pointer mb-1 hover:bg-neutral-900 transition'>
            <HiChartBar size={18} />
            <span className='mt-0.5'>Analytics</span>
          </div>

          <div className='text-sm flex items-center gap-2 font-semibold px-2 py-2 rounded-xl text-neutral-400 cursor-pointer mb-1 hover:bg-neutral-900 transition'>
            <HiCreditCard size={18} />
            <span className='mt-0.5'>Subscription</span>
          </div>

        </div>
        <div className='flex flex-col text-sm'>
          <div className='p-2 flex items-center gap-2 font-semibold text-neutral-400 rounded-xl cursor-pointer mb-1 hover:bg-neutral-900 transition'>
            <HiCog size={18} />
            <span className='mt-0.5'>Settings</span>
          </div>
          <div className='p-2 flex items-center gap-2 font-semibold text-neutral-400 rounded-xl cursor-pointer mb-1 hover:bg-neutral-900 transition'>
            <HiInformationCircle size={18} />
            <span className='mt-0.5'>Help center</span>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar