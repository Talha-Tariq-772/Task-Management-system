import React from 'react'
import ForgotPasswordForm from '../components/auth/forgotPasswordForm/ForgotPasswordForm'

function page() {
  return (
    <div className='auth-page  flex flex-col justify-center gap-[2rem] items-center'>
      <ForgotPasswordForm/>
    </div>
  )
}

export default page