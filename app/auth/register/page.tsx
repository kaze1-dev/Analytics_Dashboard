"use client"
import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import React, { SyntheticEvent, useState } from 'react'
import { signUpSchema, type SignUpInput } from '@/validaton'; 
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; 

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false); 
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null); 
  const [form, setForm] = useState<SignUpInput>({ 
    name: "", 
    email: "", 
    password: "" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError(null);

    // 1. Instant client-side validation
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue: any) => {
        if (issue.path[0]) errors[issue.path[0] as string] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsPending(true);
    
    const { error } = await authClient.signUp.email({
      email: result.data.email,
      password: result.data.password,
      name: result.data.name,
      callbackURL: "/home", 
    });

    setIsPending(false);
    if (error) {
      setGlobalError(error.message || "Registration failed. Please try again.");
    } else {
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center p-6 bg-neutral-950 selection:bg-neutral-800 selection:text-neutral-100'>
      <div className='w-full max-w-md flex flex-col justify-center items-center gap-6'>
        <form onSubmit={handleSubmit} noValidate className='w-full bg-neutral-900/40 border border-neutral-800 px-6 py-8 sm:px-8 sm:py-10 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xs flex flex-col gap-6'>
          
          <div className='space-y-2 text-center sm:text-left'>
            <h1 className='text-3xl font-black tracking-tight text-neutral-100'>Register</h1>
            <p className='text-xs sm:text-sm text-neutral-400 font-medium tracking-wide leading-relaxed'>
              Keep it all together and you'll be fine
            </p>
          </div>

          {globalError && (
            <div className='w-full bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-center text-xs font-bold tracking-wider text-red-400 uppercase duration-150'>
              {globalError}
            </div>
          )}

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <input 
                type="text" 
                className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all duration-150 ${fieldErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'}`} 
                placeholder='NAME' 
                name='name' 
                value={form.name}
                onChange={handleChange} 
              />
              {fieldErrors.name && <p className='text-[11px] font-medium text-red-400 mt-1.5 pl-1 tracking-wide uppercase'>{fieldErrors.name}</p>}
            </div>
            <div className='flex flex-col'>
              <input 
                type="email" 
                className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all duration-150 ${fieldErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'}`} 
                placeholder='EMAIL ADDRESS' 
                name='email' 
                value={form.email}
                onChange={handleChange} 
              />
              {fieldErrors.email && <p className='text-[11px] font-medium text-red-400 mt-1.5 pl-1 tracking-wide uppercase'>{fieldErrors.email}</p>}
            </div>
            
            <div className='flex flex-col relative'>
              <input 
                type={showPassword ? "text" : "password"} 
                className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all duration-150 ${fieldErrors.password ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'}`} 
                placeholder='PASSWORD' 
                name='password' 
                value={form.password}
                onChange={handleChange} 
              />
              <button className='absolute right-4 text-neutral-500 hover:text-neutral-300 top-3.5 cursor-pointer transition-colors duration-150' type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </button>
              {fieldErrors.password && <p className='text-[11px] font-medium text-red-400 mt-1.5 pl-1 tracking-wide uppercase'>{fieldErrors.password}</p>}
            </div>
          </div>
          <div className='mt-2'>
            <button 
              className='w-full bg-neutral-100 hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap' 
              type='submit'
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Register"}
            </button>
          </div>
          <div className='flex text-xs sm:text-sm gap-2 justify-center items-center mt-2 tracking-wide font-medium text-neutral-500'>
            <p>Already have an account?</p>
            <Link href="/auth/login" className='text-neutral-400 hover:text-neutral-200 transition-colors duration-150 font-bold underline decoration-neutral-800 hover:decoration-neutral-600'>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage