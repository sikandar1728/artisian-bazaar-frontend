import { Bounce, toast } from "react-toastify";

export const successToast = (message, time) => {
    return toast.success(message, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}