import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSignup } from "../hooks/usersHooks"

const SignUp = (props) => {
  const [formik, setFieldValue, loading, error] = useSignup()
  const [fieldError, setFieldError] = useState(null)
  const [imageName, setImageName] = useState("")
  // useEffect(() => {
  //   ;(async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync()
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!")
  //       }
  //     }
  //   })
  // }, [])
  const permissionRequest = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      return status
    }
  }
  const pickImage = async () => {
    const status = await permissionRequest()
    console.log(status)
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      setFieldValue({ photo: result })
      setImageName(result.uri.split("/").pop())
    } else {
      setFieldError("Image is required.")
    }
  }
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" && StatusBar.currentHeight,
        flex: 1,
        alignItems: "center",
        width: "100%",
      }}
    >
      <ScrollView>
        <Header />
        <View style={styles.SignUpMain}>
          <Text style={styles.title}>Sign Up</Text>
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

          <Text style={styles.imagePicker} onPress={pickImage}>
            Pick an image from gallery
          </Text>
          {imageName ? (
            <Text style={{ color: "black" }}>{imageName}</Text>
          ) : fieldError ? (
            <Text style={styles.errorText}>{fieldError}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )}
          {/* <Text
            style={{ color: imageName ? "black" : "white" }}
            onBlur={() => !imageName && setFieldError("Image is required.")}
          >
            {imageName || "Placeholder"}
          </Text>
          {fieldError ? (
            <Text style={styles.errorText}>{fieldError}</Text>
          ) : (
            <Text style={styles.noErrorText}>Placeholder</Text>
          )} */}
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.signupButtonContainer}
          >
            <View style={styles.signupButton}>
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.dontHaveAccountContainer}>
            <Text>Already have an account? </Text>
            <Text
              onPress={() => props.navigation.navigate("signup")}
              style={{ textDecorationLine: "underline" }}
            >
              Log In
            </Text>
          </View>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapDispatchToProps = {
  loginUser: usersActions.logInOrSignUp,
}

export default connect(null, mapDispatchToProps)(SignUp)

const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
  SignUpMain: {
    minHeight: height * 0.5,
    alignItems: "center",
    width,
  },
  title: {
    fontSize: 20,
    marginVertical: 40,
  },
  imagePicker: {
    width: "70%",
    borderColor: "lightgray",
    marginBottom: 2,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // fontSize: 16,
    color: "gray",
  },
  inputText: {
    width: "70%",
    borderColor: "lightgray",
    marginBottom: 2,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  noErrorText: { color: "white", fontSize: 10 },
  signupButtonContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
  signupButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: "black",
    width: "70%",
  },
  signupButtonText: { color: "white", textAlign: "center" },
  dontHaveAccountContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
})
