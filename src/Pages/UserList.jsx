import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../Services/userService";

function UserList() {
    // State to store the list of users
    const [users, setUsers] = useState([]);
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // Authentication context to handle user logout
    const { logout } = useAuth();
    // Hook for navigation
    const navigate = useNavigate();
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6; // Number of users displayed per page
    const [totalPages, setTotalPages] = useState(1);

    // Fetch users from the backend when the component mounts or when currentPage changes
    useEffect(() => {
        const loadUsers = async () => {
            try {
                // Fetch users and total pages from API
                const { users, totalPages } = await fetchUsers(currentPage, usersPerPage);
                setUsers(users);  // Store fetched users in state
                setTotalPages(totalPages); // Store total pages
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, [currentPage]); //re-run effect when currentpage changes

    //pagination is handled here
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    //logut is handled here
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-blue-600 bg-slate-800 p-4">
            <h2 className="text-4xl font-bold mb-8 text-white">Users List</h2>
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-900 transition cursor-pointer"
            >
                Logout
            </button>

            {loading ? (
                <p className="text-xl font-semibold">Loading users...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl ">
                        {users.map((user) => (
                            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img
                                    src={user.avatar}
                                    alt={user.first_name}
                                    className="rounded-full w-24 h-24 mx-auto"
                                />
                                <h3 className="text-2xl font-semibold text-center mt-2">
                                    {user.first_name} {user.last_name}
                                </h3>
                                <p className="text-gray-600 text-center text-lg">{user.email}</p>
                                <button
                                    className="text-lg mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                                    onClick={() => navigate(`/edit/${user.id}`)}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`cursor-pointer px-3 py-1 rounded-lg ${
                                    currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
                                }`}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`cursor-pointer px-3 py-1 rounded-lg ${
                                        currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`cursor-pointer px-3 py-1 rounded-lg ${
                                    currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Page Info */}
                    <p className="mt-4 text-white text-md">Page {currentPage} of {totalPages}</p>
                </>
            )}
        </div>
    );
}

export default UserList;
