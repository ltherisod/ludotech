import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"

const Cart = (props) => {
    console.log(props.shoppingCart)

    let totalCost = props.shoppingCart.reduce((count, item) => {
        return count + item.quantity*(item.article.hasDiscount ? item.article.discountPrice : item.article.price)
    }, 0)

    let totalWithoutDiscounts = props.shoppingCart.reduce((count, item) => {
        return count + item.quantity*item.article.price
    }, 0)

    const updateCartFunction = (action, articleId) => {
        props.updateCart(action, articleId)
        .then(res => {console.log(res)})
        .catch(e => console.log(e))
    }

    const submitSell = () => {
        console.log("sell!")
    }

    return (
        <>
            {/* <Header/> */} 
            <main>
                <section>
                    {
                    props.shoppingCart.map(article => {
                        return (
                            <article key={article.article._id}>
                                <div style={{backgroundImage: `url(${article.article.photos[0]})`, backgroundPosition: "center", backgroundSize: "cover", width: "100px", height: "100px"}}></div>
                                <p>Product: {article.article.name}</p>
                                <div>
                                    <button onClick={() => {updateCartFunction("delete", article.article._id)}}>delete</button>
                                    <button onClick={() => {updateCartFunction("decrement", article.article._id)}}>remove 1</button>
                                    <p>{article.quantity}</p>
                                    <button onClick={() => {updateCartFunction("increment", article.article._id)}}>add 1</button>
                                </div>
                                {article.article.hasDiscount ? <p>Price: {article.article.price} <span>{article.article.discountPrice}</span></p> : <p>Price: {article.article.price}</p>}
                                <p>Subtotal: {article.quantity*(article.article.hasDiscount ? article.article.discountPrice : article.article.price)}</p>
                            </article>
                        )
                    })
                    }
                </section>
                <section>
                    <article>
                        <div>
                            <p>Total without discounts:</p>
                            <p>{totalWithoutDiscounts}</p>
                        </div>
                        <div>
                            <p>Total with discounts:</p>
                            <p>{totalCost}</p>
                        </div>
                    </article>
                    <div onClick={submitSell}>Buy with PayPal</div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return ({
        shoppingCart: state.users.shoppingCart
    })
}

const mapDispatchToProps = {
    updateCart: articlesActions.updateCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)