import toast, { Toaster } from 'react-hot-toast'

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
                t.visible ? 'animate-enter' : 'animate-leave'
              } bg-white flex`}
              style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "15px", backgroundImage:"url('https://i.postimg.cc/T17d2Kn8/fondo-test.png')", backgroundPosition:"top", backgroundSize:"cover"}}
            >
              <img style={{ width: "60px", height: "60px"}}
                className="h-4 w-4 rounded-full"
                src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                alt=""
              />
              <p className="text-sm" style={{marginBottom: 0, color:"purple", fontWeight:"bold"}}>
              Prueba toast
              </p>
            </div>
          ))
    }
  
    return(
        <>
        <button onClick={prueba}> Tostadita </button>
         <Toaster 
        containerStyle={{
          top: 80,
          left: 20,
          bottom: 20,
          right: 20,}}
        toastOptions={{
          duration: 1500,
      }}/>
        </>
    )
}

export default ToastTest