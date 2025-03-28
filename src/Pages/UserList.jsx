import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchUsers } from '../Services/userService';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            }
            catch (error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handlelogout = () => {
        logout();
        navigate("/login");
    };


  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-[#1E40AF] bg-[#F3F4F6] p-4'>
        <h2 className='text-3xl font-bold mb-6'>Users List Page</h2>
        <button
        onClick={handlelogout}
        className='absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounder-lg hover:bg-red-600 transition'
        >
        Logout
        </button>

        {loading ? (
            <p className='text-xl font-semibold'>Loading users...</p>
        ):(
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl'>
            {users.map((user) => (
                <div key={user.id} className='bg-white p-4 rounded-lg shadow-md'>
                    <img src={user.avatar} alt={user.first_name} className='rounded-full w-16 h-16 mx-auto'/>
                    <h3 className='text-xl font-semibold text-center mt-2'>{user.first_name} {user.last_name}</h3>
                    <p className='text-gray-600 text-center'>{user.email}</p>
                    <button 
                    className='mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition'
                    onClick={() => navigate(`/edit/${user.id}`)}
                    >
                        Edit
                    </button>
                </div>
            ))}

        </div>
        )}

    </div>
  )
}

export default UserList