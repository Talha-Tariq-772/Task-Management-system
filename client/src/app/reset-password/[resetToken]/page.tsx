"use client"
import { useUserContext } from '@/context/userContext';
import React from 'react';
import toast from 'react-hot-toast';

interface ParamsType {
  resetToken: string;
}

interface Props {
  params: Promise<ParamsType>;
}

function ResetPasswordPage({ params }: Props) {
  const resolvedParams = React.use(params);
  const { resetToken } = resolvedParams;

  const { resetPassword } = useUserContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    resetPassword(resetToken, password);
  };

  return (
    <main className='auth-page flex flex-col justify-center gap-[2rem] items-center'>
      <form
        onSubmit={handleSubmit}
        className='
          m-8 px-10 py-14 rounded-xl bg-white w-full max-w-[520px]
          shadow-xl hover:shadow-[0_0_25px_rgba(114,99,243,0.4)]
          transition-all duration-300 transform hover:-translate-y-1
          border border-gray-100 hover:scale-105 
        '
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Reset Password
          </h1>

          {/* Password Input */}
          <div className='relative mt-4 flex flex-col'>
            <label htmlFor='password' className='mb-1 text-[#999]'>
              New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='
                px-4 py-3 border-2 border-gray-300 rounded-md bg-gray-50
                focus:outline-[#2ECC71] transition-colors duration-200 text-gray-800
              '
              placeholder='*************'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='
                absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45
              '
            >
              {showPassword ? (
                <i className='fas fa-eye-slash'></i>
              ) : (
                <i className='fas fa-eye'></i>
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className='relative mt-4 flex flex-col'>
            <label htmlFor='confirmPassword' className='mb-1 text-[#999]'>
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='
                px-4 py-3 border-2 border-gray-300 rounded-md bg-gray-50
                focus:outline-[#2ECC71] transition-colors duration-200 text-gray-800
              '
              placeholder='*************'
            />
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
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default ResetPasswordPage;