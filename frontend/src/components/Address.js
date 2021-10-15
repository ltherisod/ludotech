import { useState } from "react"
import { useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import DirectionsForm from "./DirectionsForm"
import Preloader from "./Preloader"

const Address = (props) => {
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [edit, setEdit] = useState(false)
   const { direction } = props

   const updateDirectionHandler = async (values) => {
      setLoading(true)
      const res = await dispatch(
         usersActions.updateDirection(values, direction?._id)
      )
      if (!res.success) setError(res.error)
      setLoading(false)
   }

   const initialValues = {
      alias: direction?.alias,
      receiver: direction?.receiver,
      street: direction?.street,
      number: direction?.number,
      department: direction?.department,
      zipCode: direction?.zipCode,
      city: direction?.city,
      state: direction?.state,
   }

   const deleteAddress = async (id) => {
      const res = await dispatch(usersActions.deleteDirection(id))
   }

   return (
      <>
         {loading ? (
            <Preloader />
         ) : (
            <div className="addressAddedCard">
               {!edit && (
                  <div>
                     <p>
                        <span className="dataAddres">Alias :</span>{" "}
                        {direction.alias}
                     </p>
                     <p>
                        <span className="dataAddres">Receiver :</span>{" "}
                        {direction.receiver}
                     </p>
                     <p>
                        <span className="dataAddres">Street :</span>{" "}
                        {direction.street}
                     </p>
                     <p>
                        <span className="dataAddres">Number :</span>{" "}
                        {direction.number}
                     </p>
                     <p>
                        <span className="dataAddres">Department :</span>{" "}
                        {direction.department}
                     </p>
                     <p>
                        <span className="dataAddres">Zip Code :</span>{" "}
                        {direction.zipCode}
                     </p>
                     <p>
                        <span className="dataAddres">City :</span>{" "}
                        {direction.city}
                     </p>
                     <p>
                        <span className="dataAddres">State :</span>{" "}
                        {direction.state}
                     </p>
                  </div>
               )}
               {edit && (
                  <div className="fifi d-flex flex-column align-items-center">
                     <DirectionsForm
                        submitCallback={updateDirectionHandler}
                        initialValues={initialValues}
                        buttonText="✔"
                     />
                     <button
                        className="profileButton deleteProfile"
                        style={{
                           backgroundColor: "#ce2a73",
                           width: "3.53rem",
                           marginTop: "1rem",
                        }}
                        type="button"
                        onClick={() => setEdit(!edit)}
                     >
                        X
                     </button>
                  </div>
               )}
               {!edit && (
                  <button
                     style={{
                        backgroundImage: `url(" https://i.postimg.cc/256ZjvPG/back-Button.png")`,
                     }}
                     className="profileButton editProfile"
                     type="button"
                     onClick={() => setEdit(!edit)}
                  >
                     Edit
                  </button>
               )}
               <button
                  className="profileButton deleteProfile" 
                  style={{
                     backgroundImage: `url("https://i.postimg.cc/L6km2Sc6/back-Google.png")`,
                  }}
                  type="button"
                  onClick={() => deleteAddress(direction._id)}
               >
                  Delete
               </button>
            </div>
         )}
      </>
   )
}

export default Address
