"use client"
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { SyntheticEvent } from 'react'
import { useState } from 'react'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault();

    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: "/home"
    })

  }

  return (
    <div className='px-3'>
      <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className='bg-neutral-950 px-6 py-8 rounded-2xl border border-neutral-800 w-86'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-neutral-300 mb-1'>Sign In</h1>
            <p className='text-sm text-neutral-400 font-semibold'>Keep it all together and you'll be fine</p>
          </div>
          <div className='flex flex-col gap-6'>
            <input type="email" className='w-full px-4 py-2 bg-neutral-900 rounded-lg text-sm' placeholder='Email' name='email' onChange={handleChange} />
            <div className='relative'>
              <input type={showPassword ? "text" : "password"} className='w-full px-4 py-2 bg-neutral-900 rounded-lg text-sm' placeholder='Password' name='password' onChange={handleChange} />
              <button className='absolute right-4 text-neutral-400 text-sm top-2 cursor-pointer' type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>
          <div className='flex justify-center items-center my-6'>
            <button className='rounded px-10 py-2 bg-indigo-600 active:bg-indigo-600/50 text-neutral-300 font-bold cursor-pointer transition' type='submit' >Login</button>
          </div>
          <div className='flex text-sm gap-2 justify-center items-center'>
            <p className='font-semibold text-neutral-400'>Don't have an account?</p>
            <Link href="/auth/register">
              <button className='text-indigo-600 active:text-indigo-600/50 font-bold hover:underline cursor-pointer'>Sign Up</button>
            </Link>

          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage