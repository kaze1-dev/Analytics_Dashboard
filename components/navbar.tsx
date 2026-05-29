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
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const formattedEmail = email?.split("@")[0] || "user";
  const pathname = usePathname();

  const mainNavItems = [
    { name: 'Home', href: '/home', icon: HiHome },
    { name: 'Customers', href: '/customer', icon: HiUsers },
    { name: 'Orders', href: '/orders', icon: HiShoppingCart },
    { name: 'Products', href: '/products', icon: HiSquare3Stack3D },
    { name: 'Analytics', href: '/analytics', icon: HiChartBar },
    { name: 'Subscription', href: '/subscription', icon: HiCreditCard },
  ];
  const bottomNavItems = [
    { name: 'Settings', href: '/settings', icon: HiCog },
    { name: 'Help Center', href: '/help', icon: HiInformationCircle },
  ]
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
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`text-sm flex items-center gap-2 font-semibold px-2 py-2 rounded-xl mb-1 cursor-pointer transition-all duration-200 ${isActive ? 'bg-neutral-900 text-indigo-500' : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'}`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-500' : 'text-neutral-400'} />
                  <span className='mt-0.5'>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='flex flex-col text-sm'>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`text-sm flex items-center gap-2 font-semibold px-2 py-2 rounded-xl mb-1 cursor-pointer transition-all duration-200 ${isActive ? 'bg-neutral-900 text-indigo-500' : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'}`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-500' : 'text-neutral-400'} />
                  <span className='mt-0.5'>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  )
}

export default Navbar