import axios from "axios";
import User from "../interfaces/User";

let api = process.env.REACT_APP_API + "/users";

export function getUsers() {
    return axios.get(api)
}

export function getUserID(id: number) {
    return axios.get(`${api}/${id}`)
}

export function deleteUser(id: number) {
    return axios.delete(`${api}/${id}`)
}

export function checkUser(user: User) {
    return axios.get(`${api}?email=${user.email}&password=${user.password}`)
}
export function addUser(newUser: User){
    return axios.post(api, newUser)
}
