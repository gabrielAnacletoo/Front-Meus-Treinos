import axios from "axios";


export const Infousers = async (token: string) => {
    const url = 'https://myworkouts.onrender.com/users/infouser'
    try {
        const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if(response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log('erro -> ', error)
    }
}