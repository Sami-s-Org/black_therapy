import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notifySuccess = (message: string, autoClose?: number) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: autoClose || 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

export const notifyError = (message: string, autoClose?: number) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: autoClose || 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

export const notifyInfo = (message: string, autoClose?: number) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: autoClose || 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

export const notifyWarning = (message: string, autoClose?: number) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: autoClose || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}

const ToastNotification = () => {
  return <ToastContainer style={{ marginTop: '80px' }} />
}

export default ToastNotification
