import { useState } from "react"
import { useSelector } from "react-redux"
import DirectionsForm from "../components/DirectionsForm"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import Address from "../components/Address"
import Bot from "../components/bot/Bot"
import { useFormik } from "formik"
import * as Yup from "yup"

const UserProfile = () => {
   const user = useSelector((state) => state.users.user)
   const { directions, email, firstname, lastname, photo, phone } = user
   const [visibleDirectionForm, setVisibleDirectionForm] = useState(false)
   const [visiblePhone, setVisiblePhone] = useState(false)
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const addDirectionHandler = async (values) => {
      setLoading(true)
      const res = await dispatch(usersActions.addDirection(values))
      if (!res.success) setError(res.error)
      setLoading(false)
      setVisibleDirectionForm(false)
   }

   const addPhone = async (values) => {
      setLoading(true)
      const res = await dispatch(usersActions.updateAccount(values))
      if (!res.success) setError(res.error)
      setLoading(false)
      setVisiblePhone(false)
   }

   let formik = useFormik({
      initialValues: { phone },
      onSubmit: (values) => {
         addPhone(values)
      },
      validationSchema: Yup.object({
         phone: Yup.number("Only numbers").required("Required"),
      }),
   })

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
      <div
         className="bodyArticle"
         style={{
            backgroundImage: `url("/assets/fondoblanco2.png")`,
         }}
      >
         <Bot />

         <HeroPages />

         <Header />
         <div className="flex mt-2">
            <div className="divProfile">
               <h1 className="titleProfile">
                  Pro<span style={{ color: "violet" }}>file</span>
               </h1>
               <div className="profileFirstData mb-5">
                  <div
                     className="logoUserProfile"
                     style={{
                        backgroundImage: `url('${photo}')`,
                     }}
                  ></div>
                  <div>
                     <h3>
                        {firstname} {lastname}
                     </h3>
                     <p>{email}</p>
                  </div>
               </div>
               <div className="phone mb-5">
                  <div>
                     <h2 className="profileTitles">Phone number:</h2>
                     <div className="containerDataProfile">
                        {!visiblePhone && (
                           <div className="d-flex align-items-center justify-content-around w-100">
                              <p>{phone ? phone : "No phone number added."}</p>
                              <button
                                 className="profileButton"
                                 type="button"
                                 onClick={() => setVisiblePhone(!visiblePhone)}
                                 style={{
                                    backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                                 }}
                              >
                                 {phone ? "Edit" : "+"}
                              </button>
                           </div>
                        )}
                        {visiblePhone && (
                           <>
                              <div className="phoneInput">
                                 <input
                                    placeholder="+234 455 5353"
                                    name="phone"
                                    type="number"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange("phone")}
                                    onBlur={formik.handleBlur("phone")}
                                 />
                                 {formik.touched.phone &&
                                 formik.errors.phone ? (
                                    <small className="signErrorsDir">
                                       {formik.errors.phone}
                                    </small>
                                 ) : (
                                    <small className="signNoErrorsDir">
                                       NoErrors
                                    </small>
                                 )}{" "}
                              </div>
                              <button
                                 className="profileButton"
                                 style={{
                                    backgroundColor: "#ce2a73",
                                 }}
                                 type="button"
                                 onClick={() => setVisiblePhone(!visiblePhone)}
                              >
                                 X
                              </button>
                              <button
                                 className="profileButton"
                                 style={{
                                    backgroundColor: "#45f0bf",
                                 }}
                                 type="button"
                                 onClick={formik.handleSubmit}
                              >
                                 ✔
                              </button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
               <div className="addresses">
                  <h2 className="profileTitles">Addresses:</h2>
                  <div>
                     <div>
                        {!directions || directions.length === 0 ? (
                           <div className="containerDataProfile">
                              <p>There are no addresses added.</p>
                           </div>
                        ) : (
                           <div>
                              {directions.map((direction) => {
                                 return (
                                    <div className="containerDataProfile mb-5">
                                       <Address
                                          direction={direction}
                                          key={direction._id}
                                       />
                                    </div>
                                 )
                              })}
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="d-flex flex-column">
                     <div className="inputsAddAddress">
                        {visibleDirectionForm && (
                           <DirectionsForm
                              submitCallback={addDirectionHandler}
                              initialValues={initialValues}
                              buttonText="✔"
                           />
                        )}
                     </div>
                     <button
                        className="signupButtonSignup mt-2 ps-3"
                        style={{
                           backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                        }}
                        type="button"
                        onClick={() =>
                           setVisibleDirectionForm(!visibleDirectionForm)
                        }
                     >
                        {!visibleDirectionForm
                           ? !directions || directions.length === 0
                              ? "Add Address"
                              : "Add another address"
                           : "Cancel"}
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default UserProfile
