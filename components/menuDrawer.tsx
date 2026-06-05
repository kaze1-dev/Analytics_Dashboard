"use client"
import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiHome } from 'react-icons/hi2'
import { HiChartBar } from 'react-icons/hi2'
import { HiShoppingCart } from 'react-icons/hi2'
import { HiCog } from 'react-icons/hi'
import { HiUsers } from 'react-icons/hi2'
import { HiSquare3Stack3D } from 'react-icons/hi2'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';


const MenuDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
  ];
  const bottomNavItems = [
    { name: 'Settings', href: '/settings', icon: HiCog },
  ]

  return (
    <>
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }} onClick={onClose} className='fixed inset-0 bg-black/40 z-40 transition-opacity' />
      <motion.div initial={{ x: '-100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 220, duration: 0.15 }} className={`fixed overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  left-4 top-4 bottom-4 bg-neutal-900 z-50 bg-neutral-900/10 backdrop-blur-xs border border-neutral-800 hover:border-neutral-700 px-4 py-4 rounded-2xl w-50`}>
        <div onClick={onClose} className='absolute right-1 cursor-pointer hover:bg-neutral-900 p-1.5 rounded-lg hover:text-indigo-500 transition-all'>
          <HiChevronDoubleLeft className='stroke-1' />
        </div>
        <nav className='h-full w-full justify-between flex-col font-sans rounded-2xl  transition-all cursor-default flex'>
          <div className='flex flex-col'>
            <div className='flex gap-2 bg items-center mb-10 '>

              <div className='text-2xl font-mono font-semibold'>
                <div className='bg-neutral-900/80 px-2.5 rounded-lg relative text-neutral-300'>
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
                <Link onClick={() => {
                  onClose()
                }} key={item.name} href={item.href}>
                  <div
                    className={`text-sm flex items-center gap-2 font-semibold px-2 py-2 rounded-xl mb-1 cursor-pointer transition-all duration-200 ${isActive ? 'bg-neutral-900/80 text-indigo-500' : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'}`}
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
                <Link onClick={() => {
                  onClose()
                }} key={item.href} href={item.href}>
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
      </motion.div>
    </>
  )
}

export default MenuDrawer