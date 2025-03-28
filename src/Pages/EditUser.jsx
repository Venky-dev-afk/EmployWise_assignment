import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { fetchUserById, updateUser } from '../Services/userService'

function EditUser() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({first_name: "", last_name: "", email: ""});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setErrors] = useState({});

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await fetchUserById(id);
                setUser({first_name: userData.first_name, last_name: userData.last_name, email: userData.email});
            }
            catch (error) {
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        };
        loadUser();
    }, [id]);

    const validateForm = () => {
        let newErrors = {};
        if(!user.first_name.trim()) newErrors.first_name = "First name is required";
        if(!user.last_name.trim()) newErrors.last_name = "Last name is required";
        if(!user.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(user.email)) newErrors.email = "Invalid Email format";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;
        try{
            await updateUser(id, user);
            setMessage("User updated Successfully!!");
            setTimeout(() => navigate("/users"), 1500);
        }
        catch (eror) {
            setMessage("Failed to update the user.");
        }
    };


  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
        {loading ? (
            <p className='text-xl font-semibold'>Loading...</p>
        ) : (
            <div className='bg-white p-6 rounder-lg shadow-lg w-96'>
                <h2 className='text-2xl font-bold text-center mb-4'>Edit User</h2>
                {message && <p className='text-center text-green-600'>{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full p-2 border rounded-lg"
                    />
                    {error.first_name && <p className='text-red-500 text-sm'>{error.first_name}</p>}
                    </div>

                    <div>
                    <input      
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full p-2 border rounded-lg"
                    />
                    {error.last_name && <p className='text-red-500 text-sm'>{error.last_name}</p>}
                    </div>

                    <div>
                    <input      
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded-lg"
                    />
                    {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
                    </div>

                    <button type='submit' className='w-full bbg-blue-500 text-white py-2 rounder-lg hover:bg-blue-600 transition'>
                        Update User
                    </button>

                </form>
                <button
                    onClick={() => navigate("/users")}
                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    Cancel
                </button>
            </div>
        )}
    </div>
  )
}

export default EditUser