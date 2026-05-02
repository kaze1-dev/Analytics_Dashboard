"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { SyntheticEvent } from 'react'
import { useState } from 'react'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
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

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    console.log(data)

    if (res.ok) {
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: true,
        callbackUrl: "/home"
      })
    } else {
      console.log(data.error)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-neutral-900/50 px-6 py-8 rounded-xl border-2 border-neutral-800 w-90'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-neutral-300 mb-0.5'>Sign Up</h1>
          <p className='text-sm text-neutral-400 font-semibold'>Keep it all together and you'll be fine</p>
        </div>
        <div className='flex flex-col gap-6'>
          <input type="text" className='w-full px-2 py-2 bg-neutral-800/80 rounded text-sm' placeholder='Name' name='name' onChange={handleChange} />
          <input type="email" className='w-full p-2 bg-neutral-800/80 rounded text-sm' placeholder='Email' name='email' onChange={handleChange} />
          <div className='relative'>
            <input type={showPassword ? "text" : "password"} className='w-full p-2 bg-neutral-800/80 rounded text-sm' placeholder='Password' name='password' onChange={handleChange} />
            <button className='absolute right-4 text-neutral-400 text-sm top-2 cursor-pointer' type='button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "hide" : "show"}
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center my-6'>
          <button className='rounded px-10 py-2 bg-blue-600 text-neutral-300 font-bold cursor-pointer' type='submit' >Register</button>
        </div>
        <div className='flex text-sm gap-2 justify-center items-center'>
          <p className='font-semibold text-neutral-400'>Already have an account?</p>
          <Link href="/auth/login">
            <button className='text-blue-600 font-bold hover:underline cursor-pointer'>Sign In</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage