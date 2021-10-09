import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"

const UserProfile = () => {
   const user = useSelector((state) => state.users.user)
   const { directions, email, firstname, lastname, photo, phone } = user
   console.log(user)
   return (
      <>
         <Header />
         <div
            className="signInBody"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <HeroPages />
            <div className="flex">
               <div className="main-sign">
                  <div
                     className="logoUserProfile"
                     style={{
                        backgroundImage: `url('${photo}')`,
                     }}
                  ></div>
                  <h2>
                     {firstname} {lastname}
                  </h2>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default UserProfile
