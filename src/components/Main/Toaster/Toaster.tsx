// https://fkhadra.github.io/react-toastify/introduction/

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// const CustomCloseBtn = () => (
//   <i>Close</i>
// )

export function Toaster() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
      closeButton={false}
      // closeButton={CustomCloseBtn}
    />
  )
}
