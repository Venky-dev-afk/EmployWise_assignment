import React from 'react'
import { ServerRouter, useNavigate } from 'react-router-dom';
import LoginForm from '../Components/Auth/LoginForm';
import { loginUser } from '../Services/authService';
import { useState } from 'react'

function Login() {
    // const handleLogin = (credentials) => {
    //     console.log("Logging in with:", credentials);
    // };

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async({ email, password }) => {
        try{
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token); // store the token
            navigate("/users",{replace:true}); //redirect to the user list page
        }
        catch (err) {
            ServerRouter(err.message);
        }
    };

  return (
    <div>
        {error && <p className='text-red-600 text-center'>{error}</p>}
        <LoginForm onLogin={handleLogin}/>
    </div>
  )
}

export default Login