import React, { useState, useEffect } from "react"
import axios from "axios"
import Purchase from "./Purchase"

const Sales = ({ scroll }) => {
  const [purchases, setPurchases] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [search, setSearch] = useState("")
  const [purchaseFound, setPurchaseFound] = useState(false)

  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    axios
      .get("https://lodotechgames.herokuapp.com/api/purchases", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setPurchases(res.data.response.reverse()))
      .catch((e) => console.log(e))
  }, [purchaseFound])

  const getPurchase = () => {
    axios
      .get(`https://lodotechgames.herokuapp.com/api/user/purchase/${search}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.response) {
          setPurchaseFound(res.data.response)
          setNotFound(false)
          setNewStatus(res.data.response.status)
        } else {
          setPurchaseFound(false)
          setNotFound(true)
        }
      })
      .catch((e) => {
        console.log(e)
        setNotFound(true)
      })
  }

  const changeStatus = () => {
    if (newStatus !== "Select a new status") {
      axios
        .put(
          `https://lodotechgames.herokuapp.com/api/user/purchase/${purchaseFound._id}`,
          { status: newStatus }, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
        .then((res) => {
          setPurchaseFound(res.data.response)
        })
        .catch((e) => console.log(e))
    }
  }

  const showPurchase = (purchase) => {
    setPurchaseFound(purchase)
  }

  return (
    <div
      className="mainTeamPanel"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/zDhycDV6/fondoblanco2.png')",
        backgroundSize: "cover",
      }}
    >
      <h2>Purchases</h2>
      <div className="searchUserTeam">
        <label>Search a purchase to more info</label>
        <div className="searchbarTeam">
          <input
            type="search"
            placeholder="6162577f766de90727eb542c"
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={getPurchase}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        {purchaseFound && (
          <div className="purchaseFound" style={{ width: "100%" }}>
            <div
              className="titlesPurchasesPanel"
              style={{ paddingTop: "2vmin", position: "relative" }}
            >
              <p>Order ID</p>
              <p>Products</p>
              <p>Address</p>
              <p>Date</p>
              <p>Amount</p>
              <p>Status</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setPurchaseFound(false)}
                className="closePurchase"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </div>
            <Purchase
              purchaseFound={purchaseFound}
              direction={purchaseFound.direction}
              articles={purchaseFound.articles}
              status={purchaseFound.status}
              purchase={purchaseFound}
            />
            <div>
              <div className="containerChangeBuyer">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url("${purchaseFound.user.photo}")`,
                    }}
                  ></div>
                  <div className="buyer">
                    <p>
                      {purchaseFound.user.firstname}{" "}
                      {purchaseFound.user.lastname}
                    </p>
                    <span>{purchaseFound.user.email}</span>
                  </div>
                </div>
                <div className="changeStatus">
                  <p>Change status of this purchase</p>
                  <select onClick={(e) => setNewStatus(e.target.value)}>
                    <option>Select a new status</option>
                    {purchaseFound.status !== "confirmend" && (
                      <option value="confirmed">Confirmed</option>
                    )}
                    {purchaseFound.status !== "processing" && (
                      <option value="processing">Processing</option>
                    )}
                    {purchaseFound.status !== "shipping" && (
                      <option value="shipping">Shipping</option>
                    )}
                    {purchaseFound.status !== "completed" && (
                      <option value="completed">Completed</option>
                    )}
                    {purchaseFound.status !== "cancelled" && (
                      <option value="cancelled">Canceled</option>
                    )}
                  </select>
                  <button onClick={changeStatus} className="saveTeam">
                    Save
                  </button>
                </div>
              </div>
              <div className="articlesFoundPanel">
                {purchaseFound.articles.map((article) => {
                  return (
                    <div key={article._id} className="productRow">
                      <div
                        className="productRowtPicture"
                        style={{
                          backgroundImage: `url("${article.photos[0]}")`,
                        }}
                      ></div>
                      <div className="detailsProductPanel">
                        <p className="nameProductPanel">{article.name}</p>
                        <span>
                          <p style={{ marginRight: "2vmin" }}>
                            Price: ${article.price}
                          </p>
                          <p>Quantity: {article.quantity}</p>
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        {notFound && search && (
          <span className="userDontFoundTeam">
            Dont exist an purchase with that id
          </span>
        )}
      </div>
      <div className="purchasesContainerPanel">
        <div className="titlesPurchasesPanel">
          <p>Order ID</p>
          <p>Products</p>
          <p>Address</p>
          <p>Date</p>
          <p>Amount</p>
          <p>Status</p>
        </div>
        <div className="purchasesPanel">
          {purchases.map((purchase) => {
            return (
              <Purchase
                purchaseFound={purchaseFound}
                showPurchase={showPurchase}
                key={purchase._id}
                purchase={purchase}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sales
