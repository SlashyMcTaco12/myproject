import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

let api: string = process.env.REACT_APP_API || ""

export function deleteUser(_id: string) {
    return axios.delete(`${api}/${_id}`)
}

export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login`, userToCheck)
}
export function addUser(userToAdd: User) {
    return axios.post(`${api}/register`, userToAdd)
}

export function getUserProfile() {
    return axios.get(`${api}/loggedIn`, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}

export function getIsBusiness() {
    let token = JSON.parse(localStorage.getItem("userData") as string).token
    return (jwt_decode(token) as any).accType
}