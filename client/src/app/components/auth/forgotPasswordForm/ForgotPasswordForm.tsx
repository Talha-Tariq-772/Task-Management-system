"use client"
import { useUserContext } from '@/context/userContext'
import React, { use, useState , useEffect } from 'react'

function ForgotPasswordForm() {

 

    const {forgotpasswordEmail} = useUserContext();

    //email state
    const [email, setEmail]= useState("");
    const handleEmail=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value);
    };
    const handleSubmit =(e:any)=>{
      e.preventDefault();
      forgotpasswordEmail(email);


      // clear email input feiled
      setEmail("");

    };
    
  return (
    <form className=' mx-[2rem] px-10 py-14 bg-white rounded-lg max-w-[520px]' >
<div className=' relative z-10 '>

    <h1 className='mb-2  text-center text-[1.35rem] font-medium'>
        Enter Email to reset password
    </h1>
    <div className='mt-[1rem] flex flex-col'>
          <label htmlFor='email' className='mb-1 text-[#999]'>
            Email
          </label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={handleEmail}
            name='email'
            className='
              px-4 
              py-3 
              border-2 
              border-gray-300 
              rounded-md 
              bg-gray-50
              focus:outline-[#2ECC71]
              transition-colors 
              duration-200
              text-gray-800
            '
            placeholder='abc@example.com'
          />
        </div>

        <div className="flex">
          <button
            type='submit'
           onClick={handleSubmit}
            className='
              mt-6 
              flex-1 
              px-4 
              py-3 
              font-bold 
              bg-[#2ECC71] 
              text-white 
              rounded-md 
              hover:bg-[#1abc9c] 
              hover:shadow-[0_0_20px_rgba(114,99,243,0.7)]
              transform 
              hover:scale-105 
              transition-all
            '
          >
            Reset Password
          </button>
        </div>
</div>

    </form>
  )
}

export default ForgotPasswordForm