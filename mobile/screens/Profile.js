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
const Profile = () => {
  const user = useSelector((state) => state.users.user)
  const { directions, email, firstname, lastname, photo, phone } = user
  let userPhone = phone ? phone : "No phone number added"
  let editPhone = phone ? "Edit phone number" : "Add phone number"
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

  return (
    <ScrollView>
      <ImageBackground
        style={{ width: "100%", minHeight: 400, alignItems: "center" }}
        source={{ uri: "https://i.postimg.cc/3wVXYt59/back-Ludo3.png" }}
      >
        <HeroPages />
        <Text style={styles.profileTittle}>Profile</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: photo }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.userName}>
              {firstname} {lastname}
            </Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_600SemiBold",
                fontSize: 15,
              }}
            >
              Phone number:
            </Text>
            <Text
              style={{
                marginLeft: 10,
                color: "white",
                fontFamily: "Poppins_600SemiBold",
                fontSize: 12,
              }}
            >
              {userPhone}
            </Text>
          </View>
          <View>
            {visiblePhone && (
              <>
                <ImageBackground
                  style={styles.userButton}
                  source={{
                    uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                  }}
                  imageStyle={{ borderRadius: 5 }}
                >
                  <Text
                    onPress={() => setVisiblePhone(!visiblePhone)}
                    style={{
                      color: "white",
                      fontFamily: "Poppins_600SemiBold",
                      alignSelf: "center",
                      fontSize: 10,
                    }}
                  >
                    Add phone number
                  </Text>
                </ImageBackground>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                  }}
                >
                  <TextInput
                    placeholder="+234 455 5353"
                    name="phone"
                    type="number"
                    value={formik.values.phone}
                    onChangeText={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    style={styles.inputText}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <Text>{formik.errors.phone}</Text>
                  ) : (
                    <Text style={{ color: "transparent" }}>NoErrors</Text>
                  )}
                  <ImageBackground
                    style={[styles.userButtonCheck, { position: "relative" }]}
                    source={{
                      uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                    }}
                    imageStyle={{ borderRadius: 5 }}
                  >
                    <Icon name="check" color="white" size={12} />
                    <Text
                      style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                        zIndex: 10,
                        position: "absolute",
                      }}
                      onPress={formik.handleSubmit}
                    >
                      placeholder
                    </Text>
                  </ImageBackground>
                </View>
              </>
            )}
            {!visiblePhone && (
              <TouchableOpacity onPress={() => setVisiblePhone(!visiblePhone)}>
                <ImageBackground
                  style={styles.userButton}
                  source={{
                    uri: "https://i.postimg.cc/mD7r09R8/button-Back.png",
                  }}
                  imageStyle={{ borderRadius: 5 }}
                >
                  <Text
                    onPress={() => setVisiblePhone(!visiblePhone)}
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
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 15,
                    marginRight: 15,
                  }}
                >
                  Addresses:
                </Text>
                <View>
                  {!directions || directions.length === 0 ? (
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 12,
                      }}
                    >
                      There are no addresses added
                    </Text>
                  ) : (
                    directions.map((direction) => {
                      return (
                        <Address direction={direction} key={direction._id} />
                      )
                    })
                  )}
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => setVisibleDirectionForm(!visibleDirectionForm)}
                >
                  <ImageBackground
                    style={styles.userButton}
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
                      {addAddress}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              {visibleDirectionForm && (
                <DirectionsForm
                  submitCallback={addDirectionHandler}
                  initialValues={initialValues}
                  buttonText="Add +"
                />
              )}
            </View>
          </View>
        </View>
        <Footer />
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileTittle: {
    color: "white",
    fontSize: 35,
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    marginTop: -50,
  },
  userName: {
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    color: "white",
    fontSize: 15,
  },

  userEmail: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "orange",
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
})

export default Profile
