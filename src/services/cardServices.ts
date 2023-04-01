import axios from "axios";
import busCard from "../interfaces/busCard";

let api = process.env.REACT_APP_API + "/cards"

export function getCards() {
    return axios.get(api, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}

export function getCardByID(_id: string) {
    return axios.get(`${api}/${_id}`, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}

export function deleteCard(_id: string) {
    return axios.delete(`${api}/${_id}`, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}

export function addCard(newCard: busCard){
    return axios.post(api, newCard, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}

export function updateCard(_id: string, updatedCard: busCard){
    return axios.put(`${api}/${_id}`, updatedCard, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}