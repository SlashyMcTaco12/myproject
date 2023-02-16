import axios from "axios";
import busCard from "../interfaces/busCard";

let api = process.env.REACT_APP_API + "/cards";

export function getCards() {
    return axios.get(api)
}

export function getCardID(id: number) {
    return axios.get(`${api}/${id}`)
}

export function deleteCard(id: number) {
    return axios.delete(`${api}/${id}`)
}

export function addCard(newCard: busCard){
    return axios.post(api, newCard)
}

export function updateCard(id: number, updatedCard: busCard){
    return axios.put(`${api}/${id}`, updatedCard)
}