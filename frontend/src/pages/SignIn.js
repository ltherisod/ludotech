// import { useState } from "react"
import { useFormik } from "formik"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import Header from "../components/Header"
import * as Yup from "yup"
import Bot from "../components/bot/Bot"

const SignIn = (props) => {
   let formik = useFormik({
      initialValues: { email: "", password: "", google: false },
      onSubmit: (values) => {
         props.loginUser(values, "login")
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email").required("Required"),
         password: Yup.string()
            .min(4, "Password must have at least 4 characters.")
            .required("Required"),
      }),
   })

   const responseGoogle = (res) => {
      let userGoogle = {
         email: res.profileObj.email,
         password: res.profileObj.googleId,
         google: true,
      }
      props.loginUser(userGoogle, "login")
   }

   return (
      <>
         <Bot />
         <div
            className="signInBodyCorrection"
            style={{  
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <HeroPages />
            <Header />
            <div className="flex">
               <div className="main-sign">
                  <div>
                     <h2>
                        Log <span>in!</span>
                     </h2>
                  </div>
                  <GoogleLogin
                     clientId="459150618424-3jfl8j0539f5fj34h0e3utqvao05ib8m.apps.googleusercontent.com"
                     buttonText="Sign in with Google"
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy={"single_host_origin"}
                     className="google"
                     render={(renderProps) => (
                        <div
                           className="buttonGoogle"
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                           style={{
                              backgroundImage: `url("https://i.postimg.cc/L6km2Sc6/back-Google.png")`,
                           }}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                           >
                              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                           </svg>
                           <p>Log in with Google</p>
                        </div>
                     )}
                  />
                  <div className="signupEmailOption">
                     <div></div>
                     <p>Or log in with your email</p>
                     <div></div>
                  </div>
                  <div className="inputContainer">
                     <label className="labelSign" htmlFor="email">
                        Email
                     </label>
                     <input
                        placeholder="example@email.com"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                     />
                     {formik.touched.email && formik.errors.email ? (
                        <small className="signErrors">
                           {formik.errors.email}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}{" "}
                  </div>
                  <div className="inputContainer">
                     <label className="labelSign" htmlFor="password">
                        Password
                     </label>
                     <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                     />
                     {formik.touched.password && formik.errors.password ? (
                        <small className="signErrors">
                           {formik.errors.password}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}
                  </div>
                  <div
                     className="signupButtonSignup flex"
                     onClick={formik.handleSubmit}
                     style={{
                        backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                     }}
                  >
                     Sign in
                  </div>
                  <Link
                     className="accountLink"
                     to="/signup"
                     onClick={() => window.scrollTo(0, 0)}
                  >
                     <p className="signinButtonSignupText">
                        Don't have an account? <span> Sign up Here!</span>{" "}
                     </p>
                  </Link>
               </div>
            </div>
         </div>
      </>
   )
}

const mapStateToProps = (state) => {
   return {}
}

const mapDispatchToProps = {
   loginUser: usersActions.logInOrSignUp,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
