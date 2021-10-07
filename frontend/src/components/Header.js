import React from "react"
import { Link, NavLink } from "react-router-dom"
import { FaShoppingCart, FaBell, FaHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
const iconUser = "https://i.postimg.cc/pd1gvVR7/iconuser1.png"

const Header = (props) => {
  const user = useSelector((state) => state.users.user)
  const dispatch = useDispatch()
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNav"
    >
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
              <li className="nav-item">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span
                    className="nav-link me-4"
                    onClick={() => {
                      window.scrollTo(0, 0)
                      dispatch(usersActions.logOut())
                    }}
                  >
                    Log Out
                  </span>
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="logoUser"
              style={{
                backgroundImage: `url('${user ? user.photo : iconUser}')`,
              }}
            ></div>
          </div>
          <FaBell className="iconsNav" />
          <FaHeart className="iconsNav" />
          <Link to="/cart">
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
