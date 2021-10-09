import { useState } from "react"
import { useSelector } from "react-redux"
import DirectionsForm from "../components/DirectionsForm"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import Address from "../components/Address"

const UserProfile = () => {
   const user = useSelector((state) => state.users.user)
   const { directions, email, firstname, lastname, photo, phone } = user
   const [visibleDirectionForm, setVisibleDirectionForm] = useState(false)
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const addDirectionHandler = async (values) => {
      setLoading(true)
      const res = await dispatch(usersActions.addDirection(values))
      console.log(res)
      if (!res.success) setError(res.error)
      setLoading(false)
   }

   const initialValues = {
      alias: "",
      receiver: "",
      street: "",
      number: "",
      department: "",
      zipCode: "",
      city: "",
      state: "",
   }

   return (
      <>
         <Header />
         <div
            className="backProfile"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <HeroPages />
            <div className="containerProfile">
               <div className="flex">
                  <div
                     className="logoUserProfile"
                     style={{
                        backgroundImage: `url('${photo}')`,
                     }}
                  ></div>
               </div>
               <div>
                  <div>
                     <h2>
                        {firstname} {lastname}
                     </h2>
                     <p>{email}</p>
                     <div className="d-flex">
                        <p>{phone ? phone : "No phone added"}</p>
                        <button type="button">Add here</button>
                     </div>
                  </div>
                  <div>
                     <h3>Addresses</h3>
                     <div>
                        {!directions || directions.length === 0 ? (
                           <p>There are no addresses added</p>
                        ) : (
                           directions.map((direction) => {
                              return (
                                 <Address
                                    direction={direction}
                                    key={direction._id}
                                 />
                              )
                           })
                        )}
                     </div>
                     <div className="d-flex">
                        <button
                           type="button"
                           onClick={() =>
                              setVisibleDirectionForm(!visibleDirectionForm)
                           }
                        >
                           Add Address
                        </button>
                     </div>
                     {visibleDirectionForm && (
                        <DirectionsForm
                           submitCallback={addDirectionHandler}
                           initialValues={initialValues}
                           buttonText="ADD"
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   )
}

export default UserProfile
