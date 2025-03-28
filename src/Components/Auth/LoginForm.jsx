import React from 'react'
import { useState } from 'react'

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password});
    };

  return (
    <div className='flex justify-center items-center h-screen bg-[#F3F4F6] p-4'>
        <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:max-w-md'>
            <h2 className='text-2xl font-bold text-[#1E40AF] text-center'>Login</h2>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-semibold mb-1'>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-2 border rounder-lg focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-semibold mb-1'>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-2 border rounder-lg focus:outline-none focus:ring-2 focus:ring-primary'
                        placeholder="Enter your password"
                        required
                    />    
                </div>
                <button type='submit' className='w-full bg-[#1E40AF] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300'>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default LoginForm