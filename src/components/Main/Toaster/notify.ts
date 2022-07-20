// https://fkhadra.github.io/react-toastify/positioning-toast
import { toast, Slide } from 'react-toastify'

export function notify(msg: string) {
  toast.success(msg, {
    position: 'bottom-center',
    autoClose: 1000,
    delay: 0,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    // onOpen: () => window.alert('Called when I open'),
    // onClose: () => window.alert('Called when I close')
    transition: Slide
  })
}
