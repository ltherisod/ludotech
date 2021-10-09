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
} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLogin } from "../hooks/usersHooks"

const SignIn = (props) => {
  const [formik, loading, error] = useLogin()
  console.log(formik.handleSubmit)
  return (
    <SafeAreaView
    // style={{
    //   marginTop: Platform.OS === "android" && StatusBar.currentHeight,
    //   flex: 1,
    // }}
    >
      <ScrollView>
        <Header />
        <View style={styles.SignInMain}>
          <Text>Sign In</Text>
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
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const { height } = Dimensions.get("window")
const styles = StyleSheet.create({
  SignInMain: {
    minHeight: height - StatusBar.currentHeight,
  },
  inputText: {},
  errorText: {},
  loginButtonContainer: {},
  loginButton: {},
  loginButtonText: {},
})
