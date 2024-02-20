import axios from "axios";
import { loginPayload } from "../../config/types/types";


export const Auth = async (loginPayload: loginPayload) => {
const url = 'https://myworkouts.onrender.com/auth'

try {
    const response = await axios.post(url, loginPayload)
    if (response.status === 200) {
    
        return response.data

    }
} catch (error) {
    console.log('erro =>', error)
}
}