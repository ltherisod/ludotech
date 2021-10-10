import React from "react"
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
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from "react-native"
import { useLogin } from "../hooks/usersHooks"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"

const { height } = Dimensions.get("screen")

const SignIn = (props) => {
  const [formik, loading, error] = useLogin()
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
            <Text style={styles.SignInTittle}>Sign</Text>
            <Text style={styles.SignInTittleIn}>in!</Text>
          </View>
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
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.loginButtonContainer}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>LOG IN</Text>
            </View>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.dontHaveAccountContainer}>
            <Text>Don't have an account yet? </Text>
            <Text
              onPress={() => props.navigation.navigate("signup")}
              style={{ textDecorationLine: "underline" }}
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
  title: {
    fontSize: 20,
    marginVertical: 40,
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
  loginButtonContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  loginButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: "black",
    width: "70%",
  },
  loginButtonText: { color: "white", textAlign: "center" },
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
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 25,
  },
  SignInTittleIn: {
    fontFamily: "Poppins_700Bold",
    marginLeft: 3,
    fontSize: 25,
    color: "#67f2cb",
  },
})
