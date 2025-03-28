import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../Components/Auth/LoginForm'
import { loginUser } from '../Services/authService'
import { useState } from 'react'
import { useAuth } from '../Context/AuthContext';

function Login() {
    // const handleLogin = (credentials) => {
    //     console.log("Logging in with:", credentials);
    // };

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async({ email, password }) => {
        if(!email || !password){
            setError("Email and password are required.");
            return;
        }
        try{
            const data = await loginUser(email, password);
            if(data.token){
            login(data.token); // store the token
            console.log("Navigating to /users");
            navigate("/users",{replace:true}); //redirect to the user list page
            }
            else{
                throw new Error("Invalid Credentials");
            }
        }
        catch (err) {
            setError(err.message || "Login Failed");
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