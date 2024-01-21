import axios from "axios";
import User, { DecodedToken } from "../interfaces/User";
import {jwtDecode} from "jwt-decode";

let api: string = `${process.env.REACT_APP_API}`;

// Login
export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login` , userToCheck);
}

// Register
export function addUser(newUser: User){
    return axios.post(`${api}/register` , newUser);
}

// get user by user - id
export function getUserById(id: string) {
    return axios.get(`${api}/users/${id}` , {
          headers: {
              Authorization: JSON.parse(sessionStorage.getItem("token") as string)
          .token
        }, 
   });
}

// add product to array favorite
export async function addToArrayFav(userId: string, productId: string) {
    try {
        /*let res = await getUserById(userId);
        const favCards = res.data[0].favCards;
        if (!favCards.includes(cardId)) {
            favCards.push(cardId)
        }*/

        const token = JSON.parse(sessionStorage.getItem("token") as string).token
        return axios.put(`${api}/users/${userId}/${productId}`,token, {
            headers: { "Authorization": token}, 
            
        });
    } catch (error) {
        console.log(error);
    }
}


// update user
export function updateUser(updatedUser: User, id: string) {
    return axios.put(`${api}/${id}`, updatedUser);
}

// get tokenDetails
 export function getTokenDetails() {
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwtDecode(token) as DecodedToken;
 }
