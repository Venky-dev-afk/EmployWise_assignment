import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { fetchUserById, updateUser } from '../Services/userService'

function EditUser() {
    // Extracting user ID from the URL parameters
    const {id} = useParams();
    // Hook to navigate between pages
    const navigate = useNavigate();
    // State to store user details
    const [user, setUser] = useState({first_name: "", last_name: "", email: ""});
    // Loading state to manage UI rendering
    const [loading, setLoading] = useState(true);
    // Message state to show success or error messages
    const [message, setMessage] = useState("");
    // State to store form validation errors
    const [error, setErrors] = useState({});
    // Accessing state from the navigation (if any)
    const location = useLocation();
    const { onUserUpdated } = location.state || {};

    // const handleUpdate = async () => {
    //     try{
    //         const updatedUser = await updateUser(id, {name});
    //         if(onUserUpdated){
    //             onUserUpdated(updatedUser);
    //         }
    //         navigate("/users");
    //     } catch(error) {
    //         console.error("Error updating user:", error);
    //     }
    // };

     // Fetches user details when the component mounts or when ID changes
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
                // Set loading to false after fetching data
                setLoading(false);
            }
        };
        loadUser();
    }, [id]);

    //form validation takes place
    const validateForm = () => {
        let newErrors = {};
        if(!user.first_name.trim()) newErrors.first_name = "First name is required";
        if(!user.last_name.trim()) newErrors.last_name = "Last name is required";
        if(!user.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(user.email)) newErrors.email = "Invalid Email format";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle input changes and update state
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        //validate form before submitting
        if(!validateForm()) return;
        try{
            const updatedUser = await updateUser(id,user);
            setMessage("User updated Successfully!!");

            setUser(updatedUser);
            // Notify parent component if update callback is available
            if(onUserUpdated){
                onUserUpdated(updatedUser);
            }
            //navigate back to users list after a short delay
            setTimeout(() => navigate("/users"), 1000);
        }
        catch (eror) {
            setMessage("Failed to update the user.");
            console.error(error);
        }
    };


  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-700'>
        {loading ? (
            <p className='text-xl font-semibold'>Loading...</p>
        ) : (
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
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
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
                    </div>

                    <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition cursor-pointer'>
                        Update User
                    </button>

                </form>
                <button
                    onClick={() => navigate("/users")}
                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        )}
    </div>
  )
}

export default EditUser