import React, { useState } from "react"
import ArticlesAdmin from "../components/admin/ArticlesAdmin"
import NavBar from "../components/admin/NavBar"
import Team from "../components/admin/Team"
import Sales from "../components/admin/Sales"
import Dashboard from "../components/admin/Dashboard"

const PanelAdmin = (props) => {
   const [show, setShow] = useState('dashboard')

   const render = (page) => {
      setShow(page)
   }

   return (
      <div style={{display: 'flex'}}>
         <NavBar render={render} show={show} />
         {(show === 'articles') && <ArticlesAdmin />}
         {(show === 'sold') && <Sales />}
         {(show === 'team') && <Team />}
         {(show === 'dashboard') && <Dashboard render={render} />}
      </div>
   )
}

export default PanelAdmin
