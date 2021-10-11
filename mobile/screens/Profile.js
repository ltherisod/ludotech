import React from "react"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import { ImageBackground, Text, View, Image, TextInput, TouchableOpacity} from "react-native"
import { useState } from "react"
import { useSelector } from "react-redux"
import DirectionsForm from "../components/DirectionsForm"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import Address from "../components/Address"
import { useFormik } from "formik"
import * as Yup from "yup"
const Profile = () => {
   const userPhone= phone ? phone : "No phone number added"
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
        console.log(res)
        if (!res.success) setError(res.error)
        setLoading(false)
    }

    let formik = useFormik({
        initialValues: { phone: "" },
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
    
         <ImageBackground style={{width:"100%", minHeight:400}} source={{uri: "https://i.postimg.cc/3wVXYt59/back-Ludo3.png"}}>
            <HeroPages />
            <View>
                {/* <Image source={{uri: photo}}/> */}
            </View>
            <View>
                <View>
                    <Text>{firstname}{lastname}</Text>
                    <Text>{email}</Text>
                    <Text>{userPhone}</Text>
                        <TextInput
                           placeholder="+234 455 5353"
                           name="phone"
                           type="number"
                           value={formik.values.phone}
                           onChange={formik.handleChange("phone")}
                           onBlur={formik.handleBlur("phone")}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                           <Text>
                              {formik.errors.phone}
                           </Text>
                        ) : (
                           <Text style={{color:"transparent"}}>NoErrors</Text>
                        )}
                        <TouchableOpacity  onPress={formik.handleSubmit}>
                           <Text>Add phone number</Text>
                        </TouchableOpacity>
                        <View>
                            <Text>Addresses</Text>
                            <View>
                                {!directions || directions.length === 0 ? (
                                <Text>There are no addresses added</Text>
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
                            </View>
                            <View>
                                <TouchableOpacity
                                onPress={() =>
                                    setVisibleDirectionForm(!visibleDirectionForm)
                                }
                                >
                               <Text> Add Address</Text>
                                </TouchableOpacity>
                            </View>
                            {visibleDirectionForm && (
                                <DirectionsForm
                                submitCallback={addDirectionHandler}
                                initialValues={initialValues}
                                buttonText="ADD"
                                />
                            )}  
                        </View>
                </View>
            </View>
             <Footer />
         </ImageBackground>
      
   )
}

export default Profile