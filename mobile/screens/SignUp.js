import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import {
  View,
  Text,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import Footer from "../components/Footer"
import HeroPages from "../components/HeroPages"
import { useSignup } from "../hooks/usersHooks"
import * as Google from "expo-google-app-auth"
import FontAwesome from "react-native-vector-icons/FontAwesome"
const SignUp = (props) => {
  const [formik, setFieldValue, responseGoogle, loading, error] = useSignup()
  const [fieldError, setFieldError] = useState(null)
  const [imageName, setImageName] = useState("")

  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId:
          "546540605799-8836cs47f5tqdju4sssgdi7hu4d8b39h.apps.googleusercontent.com",
        androidClientId:
          "546540605799-fhplkieo1ls6prj4bdj0fu1n7c85io86.apps.googleusercontent.com",
      })

      if (type === "success") {
        responseGoogle(user)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const galleryPermissionRequest = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      return status
    }
  }

  const cameraPermissionRequest = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      return status
    }
  }

  const pickImage = async (from) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }
    let status =
      from === "gallery"
        ? await galleryPermissionRequest()
        : await cameraPermissionRequest()
    if (status !== "granted") {
      alert("We need permissions to make this work.")
      return
    }
    const result =
      from === "gallery"
        ? await ImagePicker.launchImageLibraryAsync(options)
        : await ImagePicker.launchCameraAsync(options)
    if (!result.cancelled) {
      setFieldValue({ photo: result })
      setImageName(result.uri.split("/").pop())
    } else {
      setFieldError("Image is required.")
    }
  }
  return (
    <ScrollView>
      <ImageBackground
        style={styles.signUpBack}
        source={require("../assets/fondoVioleta.png")}
        resizeMode="cover"
      >
        <HeroPages />
        <View style={styles.SignUpMain}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.signUpTittle}>Sign</Text>
            <Text style={styles.signUpTittleIn}>up!</Text>
          </View>
          <Text style={styles.label}>Firstname</Text>
          <TextInput
            onChangeText={formik.handleChange("firstname")}
            onBlur={formik.handleBlur("firstname")}
            value={formik.values.firstname}
            placeholder="Firstname"
            style={styles.inputText}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <Text style={styles.errorText}>{formik.errors.firstname}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )}
          <Text style={styles.label}>Lastname</Text>
          <TextInput
            onChangeText={formik.handleChange("lastname")}
            onBlur={formik.handleBlur("lastname")}
            value={formik.values.lastname}
            placeholder="Lastname"
            style={styles.inputText}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <Text style={styles.errorText}>{formik.errors.lastname}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )}
          <Text style={styles.label}>Email</Text>
          <TextInput
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
            placeholder="Email"
            style={styles.inputText}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.inputText}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )}
          <Text style={styles.label}>Profile photo</Text>
          <Text style={styles.imagePicker} onPress={() => pickImage("gallery")}>
           Pick an image from gallery
          </Text>
          <Text style={styles.imagePicker} onPress={() => pickImage("camera")}>
            Take a photo
          </Text>
          {imageName ? (
            <Text style={{ color: "gray" }}>{imageName.slice(0,25)}...</Text>
          ) : fieldError ? (
            <Text style={styles.errorText}>{fieldError}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )}
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.signupButtonContainer}
          >
            <ImageBackground
              style={styles.signUpButton}
              source={{ uri: "https://i.postimg.cc/mD7r09R8/button-Back.png" }}
              imageStyle={{ borderRadius: 5 }}
            >
              <Text style={styles.signupButtonText}>Sign up</Text>
            </ImageBackground>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.dontHaveAccountContainer}>
            <Text style={{ color: "white", fontFamily: "Poppins_700Bold" }}>
              Already have an account?{" "}
            </Text>
            <Text
              onPress={() => props.navigation.navigate("signup")}
              style={{
                color: "#67f2cb",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Sign In
            </Text>
          </View>
        </View>
        <Footer />
      </ImageBackground>
    </ScrollView>
  )
}

const mapDispatchToProps = {
  loginUser: usersActions.logInOrSignUp,
}

export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  SignUpMain: {
    alignItems: "center",
  },
  signUpTittle: {
    marginTop: -35,
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 35,
  },
  signUpTittleIn: {
    marginTop: -35,
    fontFamily: "Poppins_700Bold",
    marginLeft: 3,
    fontSize: 35,
    color: "#67f2cb",
  },
  imagePicker: {
    width: 250,
    borderColor: "lightgray",
    marginBottom: 8,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "whitesmoke",
    color: "gray",
  },
  inputText: {
    width: 250,
    borderColor: "lightgray",
    marginBottom: 2,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  noErrorText: { color: "transparent", fontSize: 10 },
  signupButtonContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
  signUpButton: {
    alignSelf: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: 150,
  },
  signupButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  dontHaveAccountContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  signUpBack: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    alignSelf: "flex-start",
  },
})
