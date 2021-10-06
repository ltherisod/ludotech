import React, { useState } from "react"
import { useFormik } from "formik"
import Header from "../components/Header"
import ArticlesAdmin from "../components/admin/ArticlesAdmin"

const PanelAdmin = () => {
   const [showDashboard, setShowDashboard] = useState(false)
   const [showArticle, setShowArticle] = useState(false)
   const [showSales, setShowSales] = useState(false)
   const [showUsers, setShowUsers] = useState(false)
   return (
      <>
         <Header />
         <div
            className="body"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <div
               className="hero"
               style={{
                  backgroundImage: `url("https://i.postimg.cc/QdTXy2Wx/herofixed.png")`,
               }}
            >
               <div className="adminPanel">
                  <h1>ADMIN PANEL</h1>
                  <button
                     type="button"
                     className="adminPanelButton"
                     onClick={() => setShowDashboard(!showDashboard)}
                  >
                     Dashboard
                  </button>
                  <button
                     type="button"
                     className="adminPanelButton"
                     onClick={() => setShowArticle(!showArticle)}
                  >
                     Articles
                  </button>
                  <button
                     type="button"
                     className="adminPanelButton"
                     onClick={() => setShowSales(!showSales)}
                  >
                     Sales
                  </button>
                  <button
                     type="button"
                     className="adminPanelButton"
                     onClick={() => setShowUsers(!showUsers)}
                  >
                     Users
                  </button>
               </div>
               {showArticle && <ArticlesAdmin />}
            </div>
         </div>
      </>
   )
}

export default PanelAdmin
