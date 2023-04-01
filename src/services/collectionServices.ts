import axios from "axios";

let api = process.env.REACT_APP_API + "/collections"

export function getCollections() {
    return axios.get(api, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}

export function getCollectionById(_id: string) {
    return axios.get(`${api}/${_id}`, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("userData") as string)
                .token,
        }
    })
}