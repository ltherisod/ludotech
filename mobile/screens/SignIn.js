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
            <ImageBackground style={styles.loginButton} source={{uri : "https://i.postimg.cc/mD7r09R8/button-Back.png"}} imageStyle={{borderRadius:5}}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </ImageBackground>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.dontHaveAccountContainer}>
            <Text style={{ color: "white", fontFamily: "Poppins_700Bold", }}>Don't have an account yet? </Text>
            <Text
              onPress={() => props.navigation.navigate("signup")}
              style={{ color: "#67f2cb", fontFamily: "Poppins_700Bold", marginBottom:-50}}
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
    borderRadius:5,
    backgroundColor:"white"
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  noErrorText: { color: "transparent",
   fontSize: 10,
   },
  loginButtonContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  loginButton: {
    alignSelf:"center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: 150,
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
    marginTop:-35,
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 35,
  },
  SignInTittleIn: {
    marginTop:-35,
    fontFamily: "Poppins_700Bold",
    marginLeft: 3,
    fontSize: 35,
    color: "#67f2cb",
  },
  label:{
    color: "white",
    fontFamily: "Poppins_700Bold",
    alignSelf:"flex-start"
  }
})
