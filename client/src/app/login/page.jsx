'use client'
import React, { use } from 'react'
import { useUserContext } from '@/context/userContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../components/auth/loginForm/loginForm'


function page() {
  const {user} = useUserContext();

  const router = useRouter();
  useEffect(() => {
    if (user&& user._id) {
      router.push('/');
    }
  }, [user, router]);

  if(user && user._id) {
    return null; // or a loading spinner
  }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center " >
      <Login/>
    </div>
  )
}

export default page