import React, { useState } from "react"
import ArticlesAdmin from "../components/admin/ArticlesAdmin"
import NavBar from "../components/admin/NavBar"
import Team from "../components/admin/Team"
import { useSelector } from "react-redux"
import Sales from "../components/admin/Sales"

const PanelAdmin = (props) => {
   const [show, setShow] = useState('dashboard')

   // const user = useSelector((state) => state.users.user)

   const render = (page) => {
      setShow(page)
   }

   return (
      <div style={{display: 'flex'}}>
         <NavBar render={render} />
         {(show === 'articles') && <ArticlesAdmin />}
         {(show === 'sold') && <Sales />}
         {(show === 'team') && <Team />}
      </div>
   )
}

export default PanelAdmin
