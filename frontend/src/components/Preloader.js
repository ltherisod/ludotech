const Preloader = () => {
    return(
        <div style={{ backgroundImage: "url('/assets/fondoblanco.png')" }} className="preloaderBack">
            <img  className="rubikPreloader" src="/assets/rubikPreloader.gif" alt="loading"/>
        </div>
    )
}

export default Preloader