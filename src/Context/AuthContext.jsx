import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

// Creating an authentication context to manage login state globally
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //state to store the authentication token, it will be initialized from localStorage if available
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    //effect to update localStorage whenever the token state changes
    useEffect(() => {
        if(token) {
            //if token exists store it in localStorage
            localStorage.setItem("token", token);
        }
        else{
            //if no token, remove it from localStorage
            localStorage.removeItem("token");
        }
    }, [token]); //runs whenever the token changes

    //fucntion to handle user login
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    //function to handle user logout
    const logout = () => {
        localStorage.removeItem("token");//removes token from localStorage
        setToken(null);//set token to null when logged out
    };

    return(
        //providing authentication state and functions to all child components
        <AuthContext.Provider value={{ token, login, logout}}>
            {children} {/* Renders all child components wrapped inside AuthProvider */}
        </AuthContext.Provider>
    )
}

//custom hook to easily access authentication data in any component
export const useAuth = () => useContext(AuthContext);