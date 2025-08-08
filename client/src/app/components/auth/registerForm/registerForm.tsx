"use client"
import { useUserContext } from '@/context/userContext'
import React from 'react'

function Register() {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const toggerOfShowPassword = () => setShowPassword(!showPassword);

  return (
    <form
      className='
        m-8 
        px-10 
        py-14 
        rounded-xl 
        bg-white 
        w-full 
        max-w-[520px] 
        shadow-xl 
        hover:shadow-[0_0_25px_rgba(114,99,243,0.4)] 
        transition-all 
        duration-300 
        transform 
        hover:-translate-y-1
        border 
        border-gray-100
      '
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Register for an Account
        </h1>

        <p className='mb-8 px-8 text-center text-[#999] text-[14px] '>
          Create an account. Already have an account?{" "}
          <a
            href='/login'
            className='

            hover:scale-110
              font-bold 
              text-[#2ecc71] 
              hover:text-[#7263F3] 
              transition-transform 
              duration-300 
              transform 
             
            '
          >
            Login here
          </a>
        </p>

        {/* Full Name */}
        <div className='flex flex-col'>
          <label htmlFor='name' className='mb-1 text-[#999]'>
            Full Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => handlerUserInput("name")(e)}
            name='name'
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
            placeholder='Talha Tariq'
          />
        </div>

        {/* Email */}
        <div className='mt-4 flex flex-col'>
          <label htmlFor='email' className='mb-1 text-[#999]'>
            Email
          </label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
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

        {/* Password */}
        <div className='relative mt-4 flex flex-col'>
          <label htmlFor='password' className='mb-1 text-[#999]'>
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name='password'
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
              hover:scale-105 
            '
            placeholder='*************'
          />
          <button
            type='button'
            className='
              absolute 
              p-1 
              right-4 
              top-[43%] 
              text-[22px] 
              text-[#999] 
              opacity-45
              hover:scale-105 
            '
          >
            {showPassword ? (
              <i className='fas fa-eye-slash' onClick={toggerOfShowPassword}></i>
            ) : (
              <i className='fas fa-eye' onClick={toggerOfShowPassword}></i>
            )}
          </button>
        </div>

        {/* Register Button */}
        <div className="flex">
          <button
            type='submit'
            disabled={!name || !email || !password}
            onClick={registerUser}
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
            Register Now
          </button>
        </div>
      </div>
    </form>
  )
}

export default Register
