import React from "react"
import { Link, NavLink } from "react-router-dom"
import { FaShoppingCart, FaBell, FaHeart } from "react-icons/fa"

const iconUser = "https://i.postimg.cc/pd1gvVR7/iconuser1.png"

const Header = (props) => {
   return (
      <nav
         className="navbar navbar-expand-lg navbar-light fixed-top py-3"
         id="mainNav"
      >
         <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#top">
{/*                <img id='logo' src="assets/ludotech.png"/>               
 */}            </a>
            {window.scrollY === 0 ? <div
                     className="logoNav"
                     style={{
                        backgroundImage: 'url("assets/ludotechwhite.png")',
                     }}
                  ></div> : <div
                  className="logoNav2"
                  style={{
                     backgroundImage: 'url("assets/ludotech.png")',
                  }}
               ></div>}
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

                  <li className="nav-item">
                     <Link to="/" style={{ textDecoration: "none" }}>
                        <span
                           className="nav-link me-4"
                           // onClick={() => props.logOut()}
                        >
                           Log Out
                        </span>
                     </Link>
                  </li>
               </ul>
               <div className="d-flex justify-content-center align-items-center">
                  <div
                     className="logoUser"
                     style={{
                        backgroundImage: `url('${iconUser}')`,
                     }}
                  ></div>
               </div>
               <FaBell className="iconsNav" />
               <FaHeart className="iconsNav" />
               <FaShoppingCart className="iconsNav" />
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
