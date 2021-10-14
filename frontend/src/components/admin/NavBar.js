import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import usersActions from "../../redux/actions/usersActions"

const NavBar = ({ render, history, show }) => {
   const dispatch = useDispatch()
   const user = useSelector((state) => state.users.user)

   return (
      <div
         className="navbarPanelContainer"
         style={{
            backgroundImage:
               'url("https://i.postimg.cc/hPkxJGmV/hero-Pages.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
         }}
      >
         <div>
            {/* <div className={`logoNavPanel`} style={{backgroundImage: 'url("assets/ludotech.png")', marginBottom: '5vmin'}}></div> */}
            <h3 id="navLogo" style={{ color: "white", marginTop: "6vmin" }}>
               ludotech
            </h3>
            <div
               to="/admin"
               className={`itemNavbarPanel ${
                  show === "dashboard" && "activePanel"
               }`}
               onClick={() => render("dashboard")}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
               >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
               </svg>
               <p>Dashboard</p>
            </div>
            <div
               to="/admin/stock"
               className={`itemNavbarPanel ${
                  show === "articles" && "activePanel"
               }`}
               onClick={() => render("articles")}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
               >
                  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
               </svg>
               <p>Product Stock</p>
            </div>
            <div
               to="/admin/sold"
               className={`itemNavbarPanel ${show === "sold" && "activePanel"}`}
               onClick={() => render("sold")}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
               >
                  <path
                     fillRule="evenodd"
                     d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  />
               </svg>
               <p>Orders</p>
            </div>
            <div
               to="/admin/team"
               className={`itemNavbarPanel ${show === "team" && "activePanel"}`}
               onClick={() => render("team")}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
               >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z" />
               </svg>
               <p>Team</p>
            </div>
         </div>
         <div className="profileNavbarPanel">
            <div className="userProfileNavbarPanel">
               <div
                  className="picture"
                  style={{ backgroundImage: `url("${user.photo}")` }}
               ></div>
               <div>
                  <p className="nameNavbarPanel">
                     {user.firstname} {user.lastname}
                  </p>
               </div>
            </div>
            <div className="buttonsProfileNavbarPanel">
               <Link to="/">
                  <p
                     className="settingsButtonPanel"
                     style={{ backgroundColor: "#6AEFCF", color: "black" }}
                  >
                     Home
                  </p>
               </Link>
               <Link to="/">
                  <p
                     className="signoutPanel"
                     onClick={() => {
                        window.scrollTo(0, 0)
                        dispatch(usersActions.logOut())
                     }}
                  >
                     Log out
                  </p>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default NavBar
