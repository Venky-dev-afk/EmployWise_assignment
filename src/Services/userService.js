import axios from "axios"

const api_url = 'https://reqres.in/api/users';

export const fetchUsers = async () => {
    try{
        const response = await axios.get(api_url, {
            headers: {"Content-Type": "application/json"},
        });
        return response.data.data; //returns the user array
    }
    catch(error){
        throw new Error("Failed to fetch Users");
    }
};

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