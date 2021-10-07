import React, { useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"

const Cart = (props) => {
    useEffect(() => {
        // props.updateCart("add", "615c7525384f35c58d11bd4d")
        // .then(res => {console.log(res)})
        // .catch(e => console.log(e))
    }, [])

    return (
        <>
            <Header/>
            <main>
                
            </main>
            <Footer/>
        </>
    )
}

const mapDispatchToProps = {
    updateCart: articlesActions.updateCart,
}

export default connect(null, mapDispatchToProps)(Cart)