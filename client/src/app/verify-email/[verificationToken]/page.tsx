"use client"
import { useUserContext } from '@/context/userContext'

interface Params {
    verificationToken: string
}

function Page({ params }: { params: Params }) {
  const { verifyUser } = useUserContext()
  const { verificationToken } = params

  return (
    <div className='auth-page flex flex-col justify-center gap-[2rem] items-center'>
      <div className='bg-white flex flex-col px-[4rem] py-[2rem] rounded-md'>
        <h1 className='text-[#999] text-[2rem]'>Email Verification</h1>
      
      </div>
    </div>
  )
}

export default Page