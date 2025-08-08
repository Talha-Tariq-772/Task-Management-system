"use client"
import { useUserContext } from '@/context/userContext'
import React, { useState } from 'react'

function ChangePasswordForm() {
  const { changePassword } = useUserContext()

  // Separate states for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Password states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    changePassword(currentPassword, newPassword)
    setCurrentPassword("")
    setNewPassword("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='
        ml-0 m-8 px-10 py-14 rounded-xl bg-white w-full max-w-[520px]
        shadow-xl hover:shadow-[0_0_25px_rgba(114,99,243,0.4)]
        transition-all duration-300 transform hover:-translate-y-1
        border border-gray-100
      '
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Reset Password
        </h1>

        {/* Current Password Input */}
        <div className='relative mt-4 flex flex-col'>
          <label htmlFor='currentPassword' className='mb-1 text-[#999]'>
            Current Password
          </label>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id='currentPassword'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className='
              px-4 py-3 border-2 border-gray-300 rounded-md bg-gray-50
              focus:outline-[#2ECC71] transition-colors duration-200 text-gray-800
            '
            placeholder='*************'
          />
          <button
            type='button'
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className='
              absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45
            '
          >
            {showCurrentPassword ? (
              <i className='fas fa-eye-slash'></i>
            ) : (
              <i className='fas fa-eye'></i>
            )}
          </button>
        </div>

        {/* New Password Input */}
        <div className='relative mt-4 flex flex-col'>
          <label htmlFor='newPassword' className='mb-1 text-[#999]'>
            New Password
          </label>
          <input
            type={showNewPassword ? 'text' : 'password'}
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='
              px-4 py-3 border-2 border-gray-300 rounded-md bg-gray-50
              focus:outline-[#2ECC71] transition-colors duration-200 text-gray-800
            '
            placeholder='*************'
          />
          <button
            type='button'
            onClick={() => setShowNewPassword(!showNewPassword)}
            className='
              absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45
            '
          >
            {showNewPassword ? (
              <i className='fas fa-eye-slash'></i>
            ) : (
              <i className='fas fa-eye'></i>
            )}
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex mt-6">
          <button
            type='submit'
            className='
              flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white
              rounded-md hover:bg-[#1abc9c] hover:shadow-[0_0_20px_rgba(114,99,243,0.7)]
              transform hover:scale-105 transition-all
            '
          >
            Change Password
          </button>
        </div>
      </div>
    </form>
  )
}

export default ChangePasswordForm