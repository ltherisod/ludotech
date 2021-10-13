import toast, { Toaster } from "react-hot-toast"

//links de fotos de Ludo dependiendo la notificacion:
//error: https://i.postimg.cc/nLjP3043/robot-Error.png
//success: https://i.postimg.cc/qMFc101d/robot-Stars.png
//welcome: https://i.postimg.cc/Vk3Rk1tF/robot-Magic.png
//successborrado: https://i.postimg.cc/90MTBNTM/sword-Robot.png

const ToastTest = () => {
   const prueba = () => {
      toast.custom((t) => (
         <div
            className={`${
               t.visible ? "animate-enter" : "animate-leave"
            } bg-white flex`}
            style={{
               display: "flex",
               alignContent: "center",
               alignItems: "center",
               padding: "5px 10px",
               borderRadius: "15px",
               backgroundImage:
                  "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
               backgroundPosition: "center right 50px",
               backgroundSize: "cover",
            }}
         >
            <img
               style={{ width: "55px", height: "55px" }}
               // className="h-3 w-3 rounded-full"
               src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
               alt=""
            />
            <p
               className="text-sm"
               style={{
                  marginBottom: 0,
                  color: "#ff9424",
                  fontWeight: "bold",
               }}
            >
               You must log in to see your wish list
            </p>
         </div>
      ))
   }

   return (
      <>
         <button onClick={prueba}> Tostadita </button>
         <Toaster
            containerStyle={{
               top: 80,
               left: 20,
               bottom: 20,
               right: 20,
            }}
            toastOptions={{
               duration: 1500,
            }}
         />
      </>
   )
}

export default ToastTest
