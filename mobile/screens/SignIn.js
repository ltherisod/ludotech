import React from "react"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native"
import { useLogin } from "../hooks/usersHooks"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"
import * as Google from "expo-google-app-auth"
import Toast from 'react-native-toast-message'

const SignIn = (props) => {
  const [formik, responseGoogle, loading, error] = useLogin()
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

  return (
    <ScrollView>
      <ImageBackground
        style={styles.signInBack}
        source={require("../assets/fondoVioleta.png")}
        resizeMode="cover"
      >
        <HeroPages />
        <View style={styles.SignInMain}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.SignInTittle}>Log</Text>
            <Text style={styles.SignInTittleIn}>in!</Text>
          </View>
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
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.loginButtonContainer}
          >
            <ImageBackground
              style={styles.loginButton}
              source={{ uri: "https://i.postimg.cc/mD7r09R8/button-Back.png" }}
              imageStyle={{ borderRadius: 5 }}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </ImageBackground>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity
            onPress={signInAsync}
            style={styles.loginButtonContainer}
          >
            <ImageBackground
              style={styles.loginButtonGoogle}
              source={{ uri: "https://i.postimg.cc/L6km2Sc6/back-Google.png" }}
              imageStyle={{ borderRadius: 5 }}
            >
              <Text style={styles.loginButtonText}>Log In with Google</Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.dontHaveAccountContainer}>
            <Text style={{ color: "white", fontFamily: "Poppins_700Bold" }}>
              Don't have an account yet?{" "}
            </Text>
            <Text
              onPress={() => props.navigation.navigate("signup")}
              style={{
                color: "#67f2cb",
                fontFamily: "Poppins_700Bold",
                marginBottom: -50,
              }}
            >
              Sign Up
            </Text>
          </View>
        </View>
        <Footer />
      </ImageBackground>
    </ScrollView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  SignInMain: {
    alignItems: "center",
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
  loginButtonContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  loginButton: {
    alignSelf: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: 170,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  dontHaveAccountContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  signInBack: {
    width: "100%",
    alignItems: "center",
  },
  SignInTittle: {
    marginTop: -35,
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 35,
  },
  SignInTittleIn: {
    marginTop: -35,
    fontFamily: "Poppins_700Bold",
    marginLeft: 3,
    fontSize: 35,
    color: "#67f2cb",
  },
  label: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    alignSelf: "flex-start",
  },
  loginButtonGoogle:{
    alignSelf: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: 170,
  }
})