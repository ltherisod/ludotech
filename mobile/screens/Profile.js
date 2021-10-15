import React from "react"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import { useState } from "react"
import { useSelector } from "react-redux"
import DirectionsForm from "../components/DirectionsForm"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import Address from "../components/Address"
import { useFormik } from "formik"
import * as Yup from "yup"
import Icon from "react-native-vector-icons/FontAwesome"

const Profile = (props) => {
  const user = useSelector((state) => state.users.user)
  const { directions, email, firstname, lastname, photo, phone } = user
  let userPhone = phone ? phone : "No phone number added"
  let editPhone = phone ? "Edit" : "+"
  let addAddress =
    !directions || directions.length === 0
      ? "Add Address"
      : "Add another address"
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
  }

  let formik = useFormik({
    initialValues: { phone: "" },
    onSubmit: (values) => addPhone(values),
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

  const phoneEdition = (e) => {
    formik.handleSubmit(e)
    setVisiblePhone(!visiblePhone)
  }


  return (
    <ScrollView>
      <ImageBackground
        style={{ width: "100%", minHeight: 400 }}
        source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }}
      >
        <HeroPages />
        <Text style={styles.profileTittle}>Profile</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: photo }}
          />
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.userName}>
              {firstname} {lastname}
            </Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <View>
          <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
            <Text
              style={{
                color: "purple",
                fontFamily: "Poppins_600SemiBold",
                fontSize: 15,
              }}
            >
              Phone number:
            </Text>
          </View>
          <View style={styles.phoneCard}>
            <Text
              style={{
                marginLeft: 10,
                color: "gray",
                fontFamily: "Poppins_600SemiBold",
                fontSize: 13,
              }}
            >
              {userPhone}
            </Text>
            {!visiblePhone && (
              <TouchableOpacity onPress={() => setVisiblePhone(!visiblePhone)}>
                <ImageBackground
                  style={{ marginLeft: 30, width: 40, padding: 5 }}
                  source={{
                    uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                  }}
                  imageStyle={{ borderRadius: 5 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins_600SemiBold",
                      alignSelf: "center",
                      fontSize: 10,
                    }}
                  >
                    {editPhone}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {visiblePhone && (
              <>
                <View>
                  <TextInput
                    placeholder="+234 455 5353"
                    name="phone"
                    type="number"
                    value={formik.values.phone}
                    onChangeText={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    style={styles.inputText}
                  />
                  <TouchableOpacity onPress={phoneEdition}>
                    <ImageBackground
                      style={[
                        styles.userButtonCheck,
                        { position: "relative", marginLeft: 10 },
                      ]}
                      source={{
                        uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                      }}
                      imageStyle={{ borderRadius: 5 }}
                    >
                      <Icon name="check" color="white" size={12} />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {formik.touched.phone && formik.errors.phone ? (
            <Text style={{ alignSelf: "center", color: "red" }}>
              {formik.errors.phone}
            </Text>
          ) : (
            <Text style={{ color: "transparent" }}>NoErrors</Text>
          )}
          <View>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  color: "purple",
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 15,
                  alignSelf: "flex-start",
                  paddingLeft: 20,
                }}
              >
                Addresses:
              </Text>
              <View>
                {!directions || directions.length === 0 ? (
                  <View style={styles.phoneCard}>
                        <Text
                        style={{
                          color: "gray",
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: 14,
                    
                        }}
                      >
                        There are no addresses added
                      </Text>
                  </View>
                 
                ) : (
                  directions.map((direction) => {
                    return <Address direction={direction} key={direction._id} />
                  })
                )}
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                onPress={() => setVisibleDirectionForm(!visibleDirectionForm)}
              >
                <ImageBackground
                  style={{ width: 230, padding: 10, alignSelf: "center" }}
                  source={{
                    uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                  }}
                  imageStyle={{ borderRadius: 5 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins_600SemiBold",
                      alignSelf: "center",
                      fontSize: 16,
                    }}
                  >
                    {addAddress}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('PurchasesStack')} >
                <ImageBackground style={{ width: 230, padding: 10, alignSelf: "center" }} source={{ uri: "https://i.postimg.cc/mD7r09R8/button-Back.png", }} imageStyle={{ borderRadius: 5 }} >
                  <Text style={{ color: "white", fontFamily: "Poppins_600SemiBold", alignSelf: "center", fontSize: 16, }} >
                    Purchases
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            {visibleDirectionForm && (
              <DirectionsForm
                submitCallback={addDirectionHandler}
                initialValues={initialValues}
                buttonText="Add Address"
              />
            )}
          </View>
        </View>
        <Footer />
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileTittle: {
    color: "purple",
    fontSize: 38,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginTop: -60,
    letterSpacing: 1,
  },
  userName: {
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    color: "purple",
    fontSize: 20,
    textAlign: "center",
  },

  userEmail: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#6aefcf",
    textAlign: "center",
  },
  userButton: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 150,
  },
  userButtonCheck: {
    marginTop: 10,
    marginLeft: -40,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 11,
    width: 45,
  },
  inputText: {
    width: 150,
    borderColor: "lightgray",
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  userButton2: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 70,
  },
  phoneCard: {
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6.0,
    elevation: 24,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
  },
})

export default Profile
