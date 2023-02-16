import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(message: string) {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
    })
}

export function errorMsg(message: string) {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
    })
}

export function confirmMsg(message: any) {
    toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        theme: 'dark'
    })
}