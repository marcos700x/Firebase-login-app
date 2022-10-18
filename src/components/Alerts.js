import { toast } from "react-toastify";

export const notifyError = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 2300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

export const notifySuccess = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 2300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

export const notifyInfo = (message) => toast.info(message, {
    position: "top-right",
    autoClose: 2300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });