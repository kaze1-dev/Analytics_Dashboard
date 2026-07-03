"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiHome,
  HiChartBar,
  HiShoppingCart,
  HiUsers,
  HiSquare3Stack3D,
  HiCog6Tooth,
  HiChevronDoubleLeft,
} from 'react-icons/hi2';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { name: 'Home', href: '/home', icon: HiHome },
  { name: 'Customers', href: '/customer', icon: HiUsers },
  { name: 'Orders', href: '/orders', icon: HiShoppingCart },
  { name: 'Products', href: '/products', icon: HiSquare3Stack3D },
  { name: 'Analytics', href: '/analytics', icon: HiChartBar },
];

const bottomNavItems = [
  { name: 'Settings', href: '/settings', icon: HiCog6Tooth },
];

const MenuDrawer = ({ isOpen, onClose }: MenuDrawerProps) => {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ x: '-100%', opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="fixed left-4 top-4 bottom-4 w-64 bg-neutral-950/95 backdrop-blur-md border border-neutral-900 p-4 rounded-2xl z-50 shadow-2xl flex flex-col justify-between overflow-y-auto select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6 group">
            <Link
              href="/home"
              onClick={onClose}
              className="flex gap-3 items-center p-1 rounded-xl transition-colors"
            >
              <div className="relative shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-sm font-bold font-mono text-neutral-300">
                FA
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
              </div>
              <div className="flex flex-col min-w-0 leading-tight">
                <span className="text-sm font-semibold text-neutral-200 truncate">
                  Faisal
                </span>
                <span className="text-neutral-500 text-xs truncate">
                  faisal123
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="h-8 w-8 flex items-center justify-center cursor-pointer text-neutral-400 hover:text-indigo-400 hover:bg-neutral-900/60 rounded-lg transition-all"
            >
              <HiChevronDoubleLeft size={16} />
            </button>
          </div>
          <nav className="flex flex-col space-y-0.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className="block group"
                >
                  <div
                    className={`relative text-sm flex items-center gap-3 font-medium px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-neutral-900 text-indigo-400 font-semibold'
                        : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-500" />
                    )}
                    <Icon
                      size={20}
                      className={`transition-colors duration-200 shrink-0 ${
                        isActive ? 'text-indigo-400' : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Configuration Link Block Wrapper */}
        <div className="flex flex-col pt-3 border-t border-neutral-900">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className="block group"
              >
                <div
                  className={`relative text-sm flex items-center gap-3 font-medium px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-neutral-900 text-indigo-400 font-semibold'
                      : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-500" />
                  )}
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 shrink-0 ${
                      isActive ? 'text-indigo-400' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default MenuDrawer;