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
} from "react-native"
import { useLogin } from "../hooks/usersHooks"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"

const SignIn = (props) => {
  const [formik, loading, error] = useLogin()
  console.log(formik.handleSubmit)
  return (
    
    <ScrollView>
        <ImageBackground style={styles.signInBack} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
          <HeroPages/>
          <View style={styles.SignInMain}>
            <View style={{flexDirection:"row", alignItems:"center" , justifyContent:"center"}}>
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
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            )}
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={styles.inputText}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errorText}>
                {formik.errors.password || "ola"}
              </Text>
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
            <View>
              <Text>Don't have an account yet? </Text>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("signup")}
              >
                <View>
                  <Text>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Footer/>
      </ImageBackground>
    </ScrollView>
  )
}

export default SignIn


const styles = StyleSheet.create({

  signInBack:{
    width:"100%",
    alignItems:"center"
},
  SignInTittle: {
    color:"white",
    fontFamily:"Poppins_700Bold",
    fontSize:25,
  },
  SignInTittleIn:{
    fontFamily:"Poppins_700Bold",
    marginLeft:3,
    fontSize:25,
    color:"#67f2cb",
  },
  inputText: {},
  errorText: {},
  loginButtonContainer: {},
  loginButton: {},
  loginButtonText: {},
})
