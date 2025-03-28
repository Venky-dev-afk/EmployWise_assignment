import axios from "axios"

const api_url = 'https://reqres.in/api/users';


//logic to fetch the users using the api call
export const fetchUsers = async (page = 1, perPage = 6) => {
    try {
        const response = await axios.get(`${api_url}?page=${page}&per_page=${perPage}`, {
            headers: { "Content-Type": "application/json" },
        });
        return {
            users: response.data.data, // User array
            totalPages: response.data.total_pages, // Total pages from API
            totalUsers: response.data.total, // Total users available
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};

//logic to fetch the user by id(useful in the editing logic)
export const fetchUserById = async (id) => {
    try {
        const response = await axios.get(`${api_url}/${id}`, {
            headers: {"Content-Type": "application/json"},
        });
        return response.data.data;
    }
    catch (error) {
        console.error("Fetch User by ID Error:", error.response || error.message);
        throw new Error("Failed to fetch user details");
    }
};

//logic to update the data
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${api_url}/${id}`, userData, {
            headers: {"Content-Type": "application/json"}
        });
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to update user");
    }
};