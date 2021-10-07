import React, { useState } from "react"
import ArticlesAdmin from "../components/admin/ArticlesAdmin"
import NavBar from "../components/admin/NavBar"
import Team from "../components/admin/Team"

const PanelAdmin = (props) => {
   const [show, setShow] = useState('dashboard')

   const render = (page) => {
      setShow(page)
   }

   return (
      <div style={{display: 'flex'}}>
         <NavBar render={render} />
         {(show === 'articles') && <ArticlesAdmin />}
         {(show === 'team') && <Team />}
      </div>
   )
}

export default PanelAdmin
