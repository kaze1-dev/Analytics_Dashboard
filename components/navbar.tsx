"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import {
  HiHome,
  HiChartBar,
  HiShoppingCart,
  HiUsers,
  HiSquare3Stack3D,
  HiCog6Tooth,
  HiBars3,
} from 'react-icons/hi2';

import MenuDrawer from './menuDrawer';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const mainNavItems: NavItem[] = [
  { name: 'Home', href: '/home', icon: HiHome },
  { name: 'Customers', href: '/customer', icon: HiUsers },
  { name: 'Orders', href: '/orders', icon: HiShoppingCart },
  { name: 'Products', href: '/products', icon: HiSquare3Stack3D },
  { name: 'Analytics', href: '/analytics', icon: HiChartBar },
];

const bottomNavItems: NavItem[] = [
  { name: 'Settings', href: '/settings', icon: HiCog6Tooth },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Link 
      href={item.href} 
      aria-current={isActive ? 'page' : undefined} 
      className={`relative text-sm flex items-center gap-3 font-medium px-3.5 py-2.5 rounded-xl mb-1 select-none transition-all duration-150 group ${
        isActive
          ? 'bg-neutral-900 text-neutral-100 font-semibold shadow-xs'
          : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200'
      }`}
    >
      {/* Premium Obsidian Accent Line Strip */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-neutral-200" />
      )}
      
      <Icon
        size={20}
        className={`transition-all duration-150 shrink-0 ${
          isActive 
            ? 'text-neutral-200' 
            : 'text-neutral-500 group-hover:text-neutral-300 group-hover:scale-102'
        }`}
      />
      <span className="transition-transform duration-150 group-hover:translate-x-0.5 md:group-hover:translate-x-0">
        {item.name}
      </span>
    </Link>
  );
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed left-4 top-4 bottom-4 w-56 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col justify-between p-4 shadow-2xl shadow-black/40 select-none hidden md:flex transition-all duration-200">
        <div className="flex flex-col">
          {/* User Profile Summary Profile Node */}
          <Link
            href="/home"
            className="group flex gap-3 items-center mb-6 p-2 rounded-xl transition-all duration-150 hover:bg-neutral-900/40 border border-transparent hover:border-neutral-900"
          >
            <div className="relative shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-sm font-bold font-mono text-neutral-300 group-hover:border-neutral-700 transition-colors shadow-inner">
              FA
              <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-neutral-950 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="text-sm font-semibold text-neutral-200 truncate group-hover:text-white transition-colors">
                Faisal
              </span>
              <span className="text-neutral-500 text-xs font-mono tracking-tight truncate mt-0.5">
                faisal123
              </span>
            </div>
          </Link>
          
          <div className="flex flex-col space-y-0.5">
            {mainNavItems.map((item) => (
              <NavLink key={item.name} item={item} isActive={pathname === item.href} />
            ))}
          </div>
        </div>
        
        <div className="flex flex-col pt-3 border-t border-neutral-900/80">
          {bottomNavItems.map((item) => (
            <NavLink key={item.name} item={item} isActive={pathname === item.href} />
          ))}
        </div>
      </nav>

      {/* Mobile Menu Activation Switch */}
      <button
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
        className="fixed md:hidden top-6 left-4 z-40 h-10 w-10 flex items-center justify-center border border-neutral-850 bg-neutral-950/80 backdrop-blur-md text-neutral-400 hover:text-neutral-100 active:scale-95 rounded-xl transition-all shadow-lg cursor-pointer"
      >
        <HiBars3 size={22} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;