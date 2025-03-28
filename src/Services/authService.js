import axios from 'axios'

const api_url = "https://reqres.in/api/login";


//authorization at the time of login
export const loginUser = async (email, password) => {
    try{
        const response = await axios.post(api_url, {email, password});
        return response.data; //returns the token if successful
    }
    catch (error) {
        throw new Error(error.response?.data?.error || "Login Failed");
    }
};