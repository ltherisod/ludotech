import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Dashboard = () => {

    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        axios.get('https://lodotechgames.herokuapp.com/api/purchases')
            .then(res=> {
                setPurchases(res.data.response.slice(0,4))
            })
            .catch(e => console.log(e))
    },[])

    return (
        <div className='dashboardMain'>
            <h2>Dashboard</h2>
            <h4>Recent orders</h4>
            <div className='recentOrdersContainer'>
                <div className='titlesRecentOrders'> 
                    <p>Order ID</p>
                    <p>Products</p>
                    <p>Date</p>
                    <p>Amount</p>
                    <p>Status</p>
                </div>
                <div className='recentOrders'>
                    {purchases.map(purchase => <Purchase purchase={purchase} />)}
                </div>
            </div>
        </div>
    )
}

export default Dashboard


const Purchase = ({purchase}) => {
    const [color, setColor] = useState('red')

    useEffect(() => {
        purchase.status === 'processing' && setColor('purple')
        purchase.status === 'confirmed' && setColor('blue')
        purchase.status === 'cancelled' && setColor('red')
        purchase.status === 'shipping' && setColor('orange')
        purchase.status === 'completed' && setColor('green')
    }, [])

    return (
        <div className='recentOrder'>
            <div><p>...{purchase._id.substring(18, 24 )}</p></div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className='articleDashboard' style={{backgroundImage: `url("${purchase.articles[0].photos[0]}")`}}></div>
                <p>{purchase.articles.length > 1 && `+${purchase.articles.length-1}`}</p>
            </div>
            <div>{purchase.timestamp && <p>{purchase.timestamp.split('T')[0]}</p>}</div>
            <div><p>${purchase.total}.00</p></div>
            <div className={`statusPurchasePanel ${color}`}>
                <p>{purchase.status}</p>
            </div>
        </div>
    )
}