import axios from 'axios';




export const getUserList = async () => {
    let users = await axios.get( `api/users` );
    return users.data
}

