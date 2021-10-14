import axios from "axios"
import { useEffect, useState } from "react"

const fetchPaypalToken = async () => {
  try {
    const credentialsResponse = await axios.get(
      "https://lodotechgames.herokuapp.com/api/admin/paypal-credentials",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")
    const res = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        auth: credentialsResponse.data.response,
      }
    )
    // const res = await axios.post(options)
    return res.data.access_token // el token viene en la propiedad access_token
  } catch (e) {
    console.log(e.message)
  }
}

const searchPaypalPurchaseInfo = async (token, id) => {
  const res = await axios.get(
    `https://api.sandbox.paypal.com/v2/checkout/orders/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

const test = async () => {
  const token = await fetchPaypalToken()
  const info = await searchPaypalPurchaseInfo(token, "01A96278AR325774V")
  return { token, info }
}

const Test = () => {
  const [token, setToken] = useState("")
  const [info, setInfo] = useState({})
  useEffect(() => {
    test()
      .then(({ token, info }) => {
        setToken(token)
        setInfo(info)
      })
      .catch((e) => console.log(e.message))
      // eslint-disable-next-line
  }, [])
  return (
    <div>
      <h1>Testeando la integración con Paypal</h1>
      <p>Token: {token}</p>
      <p>info: {JSON.stringify(info)}</p>
    </div>
  )
}

export default Test
