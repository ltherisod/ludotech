import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaShoppingCart, FaBell, FaHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import toast from "react-hot-toast"

const Header = (props) => {
  const iconUser = "https://i.postimg.cc/pd1gvVR7/iconuser1.png"
  const HOST = "https://lodotechgames.herokuapp.com"
  const user = useSelector((state) => state.users.user)
  const dispatch = useDispatch()
  const [changeTitle, setChangeTitle] = useState(false)

  const toggleTitle = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 1) {
      setChangeTitle(true)
    } else if (scrolled <= 1) {
      setChangeTitle(false)
    }
  }
  window.addEventListener("scroll", toggleTitle)

  const [showNoti, setShowNoti] = useState(false)

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNav"
    >
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#top">
          {changeTitle ? (
            <h3 id="navLogo">
              <span className="spanViolet">ludo</span>
              <span className="spanRed">t</span>
              <span className="spanGreen">e</span>
              <span className="spanOrangi">c</span>
              <span className="spanViolet2">h</span>
            </h3>
          ) : (
            <h3 id="navLogo">ludotech</h3>
          )}
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
                    Log In
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
                  <p className="text-white px-2 pt-1">{user.email}</p>
                  <hr className="dropdown-divider" />
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
          <div className="d-flex align-items-center">
            <div className="d-flex">
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
          {user ? (
            <>
              <Link to="/wishlist"  onClick={() => window.scrollTo(0, 0)}>
                <FaHeart className="iconsNav" />
                
              </Link>
              <Link
                to="/cart"
                id={user ? "cart_loggedin" : "cart_loggedout"}
                onClick={() => window.scrollTo(0, 0)}
              >
                <FaShoppingCart className="iconsNav" />
              </Link>
            </>
          ) : (
            <>
              <FaHeart
                className="iconsNav"
                onClick={() =>
                  toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } bg-white flex`}
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        backgroundImage:
                          "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
                        backgroundPosition: "center right 50px",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        style={{ width: "55px", height: "55px" }}
                        className="h-3 w-3 rounded-full"
                        src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                        alt=""
                      />
                      <p
                        className="text-sm"
                        style={{
                          marginBottom: 0,
                          color: "#ff9424",
                          fontWeight: "bold",
                        }}
                      >
                        You must log in to see your wish list
                      </p>
                    </div>
                  ))
                }
              />{" "}
              <FaShoppingCart
                className="iconsNav"
                onClick={() =>
                  toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } bg-white flex`}
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        backgroundImage:
                          "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
                        backgroundPosition: "center right 50px",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        style={{ width: "55px", height: "55px" }}
                        className="h-3 w-3 rounded-full"
                        src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                        alt=""
                      />
                      <p
                        className="text-sm"
                        style={{
                          marginBottom: 0,
                          color: "#ff9424",
                          fontWeight: "bold",
                        }}
                      >
                        You must log in to see your shopping cart
                      </p>
                    </div>
                  ))
                }
              />
            </>
          )}
            </div>
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

const Notifications = (props) => {
  const not = [
    {
      src: "https://hiperlibertad.vteximg.com.br/arquivos/ids/178443-1000-1000/MONOPOLY-CLASICO-1-9232.jpg?v=637560194297530000",
      text: "Compraste Monopoly Millonaire",
    },
    {
      src: "https://hiperlibertad.vteximg.com.br/arquivos/ids/178443-1000-1000/MONOPOLY-CLASICO-1-9232.jpg?v=637560194297530000",
      text: "Compraste Monopoly Millonaire",
    },
    {
      src: "https://hiperlibertad.vteximg.com.br/arquivos/ids/178443-1000-1000/MONOPOLY-CLASICO-1-9232.jpg?v=637560194297530000",
      text: "Compraste Monopoly Millonaire",
    },
  ]

  return (
    <div className="notificationsHeader" onMouseLeave={() => props.show(false)}>
      <h5>Notifications</h5>
      {not.map((o) => {
        return (
          <div className="notificationHeader">
            <div
              className="iconNoti"
              style={{ backgroundImage: `url("${o.src}")` }}
            ></div>
            <p>{o.text}</p>
          </div>
        )
      })}
    </div>
  )
}