import React from 'react'
import { useState } from 'react'

function LoginForm({ onLogin }) {

    // State variables to store user input for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevents default form submission behavior (page reload)
        onLogin({email, password}); // Calls the onLogin function passed as a prop with user input
    };

  return (
    <div className='flex justify-center items-center h-screen bg-slate-800 p-4'>
        <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:max-w-md'>
            <h2 className='text-2xl font-bold text-blue-600 text-center'>Login</h2>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className='mt-4 '>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-semibold mb-1'>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
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
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
                        placeholder="Enter your password"
                        required
                    />    
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300 cursor-pointer'>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default LoginForm