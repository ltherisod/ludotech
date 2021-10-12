import React from "react"
import { Link, NavLink } from "react-router-dom"
import { FaShoppingCart, FaBell, FaHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import toast, { Toaster } from "react-hot-toast"
import { toastTest } from "./ToastTest"
const iconUser = "https://i.postimg.cc/pd1gvVR7/iconuser1.png"
const HOST = "https://lodotechgames.herokuapp.com"

const Header = (props) => {
   const user = useSelector((state) => state.users.user)
   const dispatch = useDispatch()

   return (
      <nav
         className="navbar navbar-expand-lg navbar-light fixed-top py-3"
         id="mainNav"
      >
         <Toaster
            containerStyle={{
               top: 80,
               left: 20,
               bottom: 20,
               right: 20,
            }}
            toastOptions={{
               duration: 1500,
            }}
         />
         <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#top">
               <h3 id="navLogo">ludotech</h3>
               {/* {window.scrollY === 0 ? <h3>ludotech</h3> : <p>hola</p>} */}
            </a>
            <button
               className="navbar-toggler navbar-toggler-right"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarResponsive"
               aria-controls="navbarResponsive"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
               <ul className="navbar-nav ms-auto my-2 my-lg-0">
                  <li className="nav-item">
                     <NavLink
                        className="nav-link"
                        exact
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                     >
                        Home
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink
                        className="nav-link"
                        to="/articles"
                        onClick={() => window.scrollTo(0, 0)}
                     >
                        Articles
                     </NavLink>
                  </li>
                  {user.isAdmin && (
                     <li className="nav-item">
                        <NavLink
                           className="nav-link"
                           to="/admin"
                           onClick={() => window.scrollTo(0, 0)}
                        >
                           Admin
                        </NavLink>
                     </li>
                  )}

                  {!user ? (
                     <>
                        <li className="nav-item">
                           <NavLink
                              className="nav-link"
                              to="/signup"
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              Sign Up
                           </NavLink>
                        </li>

                        <li className="nav-item">
                           <NavLink
                              className="nav-link me-4"
                              to="/signin"
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              Sign In
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     <li className="nav-item dropdown">
                        <a
                           className="nav-link dropdown-toggle"
                           data-bs-toggle="dropdown"
                           href="#"
                           role="button"
                           aria-expanded="false"
                        >
                           Settings
                        </a>
                        <ul className="dropdown-menu settings mt-3">
                           <li>
                              <NavLink
                                 className="nav-link"
                                 to="/profile"
                                 onClick={() => window.scrollTo(0, 0)}
                              >
                                 Profile
                              </NavLink>
                           </li>
                           <li className="nav-item">
                              <NavLink
                                 className="nav-link"
                                 to="/mypurchases"
                                 onClick={() => window.scrollTo(0, 0)}
                              >
                                 Purchases
                              </NavLink>
                           </li>
                           <li>
                              <hr className="dropdown-divider" />
                           </li>
                           <li>
                              <Link
                                 to="/"
                                 style={{ textDecoration: "none" }}
                                 className="nav-link"
                                 onClick={() => {
                                    window.scrollTo(0, 0)
                                    dispatch(usersActions.logOut())
                                 }}
                              >
                                 Log Out
                              </Link>
                           </li>
                        </ul>
                     </li>
                  )}
               </ul>
               <div className="d-flex justify-content-center align-items-center">
                  <div
                     className="logoUser"
                     style={{
                        backgroundImage: `url('${
                           user
                              ? user.google
                                 ? user.photo
                                 : `${HOST}/${user.photo}`
                              : iconUser
                        }')`,
                     }}
                  ></div>
               </div>
               <div className="relative">
                  <FaBell className="iconsNav" />
                  <div className="notification">2</div>
               </div>
               <Link to="wishlist">
                  <FaHeart className="iconsNav" />
               </Link>
               {/* <FaHeart className="iconsNav" onClick={toastTest()} /> */}
               <Link to="/cart" onClick={() => window.scrollTo(0, 0)}>
                  <FaShoppingCart className="iconsNav" />
               </Link>
            </div>
         </div>
      </nav>
   )
}

window.addEventListener("DOMContentLoaded", () => {
   var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector("#mainNav")
      if (!navbarCollapsible) {
         return
      }
      if (window.scrollY === 0) {
         navbarCollapsible.classList.remove("navbar-shrink")
      } else {
         navbarCollapsible.classList.add("navbar-shrink")
      }
   }
   navbarShrink()
   document.addEventListener("scroll", navbarShrink)
   const navbarToggler = document.body.querySelector(".navbar-toggler")
   const responsiveNavItems = [].slice.call(
      document.querySelectorAll("#navbarResponsive .nav-link")
   )
   responsiveNavItems.map(function (responsiveNavItem) {
      return responsiveNavItem.addEventListener("click", () => {
         if (window.getComputedStyle(navbarToggler).display !== "none") {
            navbarToggler.click()
         }
      })
   })
})

export default Header
