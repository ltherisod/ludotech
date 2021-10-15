import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Dashboard = ({render}) => {

    const [purchases, setPurchases] = useState([])
    const [users, setUsers] = useState([])
    const [customers, setCustomers] = useState(null)
    const [revenue, setRevenue] = useState(0)
    const [articles, setArticles] = useState([])
    const [registered, setRegistered] = useState([])

    useEffect(() => {

        axios.get('https://lodotechgames.herokuapp.com/api/purchases',
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res=> {
                setPurchases(res.data.response.slice(0,4))
                setRevenue(res.data.response.reduce((a,b) => (a+b.total), 0))
                setCustomers(res.data.response.reduce((a,b)=> a.includes(b.user._id) ? a : [...a, b.user._id], []).length)
            })
            .catch(e => console.log(e))

        axios.get('https://lodotechgames.herokuapp.com/api/users-count',
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res=> setUsers(res.data.response))
            .catch(e => console.log(e))

        axios.get('https://lodotechgames.herokuapp.com/api/last-articles',
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res=> setArticles(res.data.response))
            .catch(e => console.log(e))

        axios.get('https://lodotechgames.herokuapp.com/api/last-registered',
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res=> setRegistered(res.data.response))
            .catch(e => console.log(e))
            // eslint-disable-next-line
    },[])

    return (
        <div className='dashboardMain' style={{ backgroundImage: "url('https://i.postimg.cc/zDhycDV6/fondoblanco2.png)" }}>
            <div>
                <div className='statistics'>
                        <div className='boxDash'>
                            <div className='miniboxDash blue'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                </svg>
                            </div>
                            <div>
                                <span>Customers</span>
                                <p>{customers}/<span style={{fontSize: '3.5vmin'}}>{users}</span></p>
                            </div>
                        </div>
                        <div className='boxDash'>
                            <div  className='miniboxDash orange'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            </div>
                            <div>
                                <span>Total purchases</span>
                                <p>{purchases.length}</p>
                            </div>
                        </div>
                        <div className='boxDash'>
                            <div className='miniboxDash green'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                    <path fillRule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                </svg>
                            </div>
                            <div>
                                <span>Total revenue</span>
                                <p>${revenue.toFixed(0)}</p>
                            </div>
                        </div>
                
            
                
                </div>
                <div className='recentOrdersContainer'>
                    <h5 style={{padding: '2vmin 2vmin', color: 'black' }}>Recent orders</h5>
                    <div className='titlesRecentOrders'> 
                        <p>Order ID</p>
                        <p>Products</p>
                        <p>Date</p>
                        <p>Amount</p>
                        <p>Status</p>
                    </div>
                    <div className='recentOrders'>
                        {purchases.map(purchase => <Purchase key={purchase._id} purchase={purchase} />)}
                    </div>
                    <p onClick={() => render('sold')} style={{textAlign: 'center', marginTop: '2vmin', cursor: 'pointer', fontSize: '2.3vmin'}}>See all orders</p>
                </div>
            </div>
            <div className='other'>
                <div className='lastAddedProducts' style={{marginBottom: '3vmin', }}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h5>Last added products</h5>
                    </div>
                    {articles.map(article => {
                        return (
                            <div key={article._id} className='productRow' style={{marginBottom: '2vmin'}}>
                                <div className='productRowtPicture' style={{backgroundImage: `url("${article.photos[0]}")`}}></div>
                                <div className='detailsProductPanel'>
                                    <p className='nameProductPanel'>{article.name}</p>
                                    <span>
                                        <p style={{marginRight: '2vmin'}}>Price: ${article.price}</p>
                                        <p>Stock: {article.stock}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                    <p style={{textAlign: 'center', cursor: 'pointer', fontSize: '2.2vmin'}} onClick={() => render('articles')}>See all</p>
                    
                </div>
                <div className='lastAddedProducts' style={{paddingBottom: '1vmin'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h5>Last registered</h5>
                    </div>
                    {registered.map(user => {
                        return (
                            <div key={user._id} className='productRow' style={{marginBottom: '2vmin'}}>
                                <div className='productRowtPicture' style={{backgroundImage: `url("${user.photo}")`, borderRadius: '50%'}}></div>
                                <div className='detailsProductPanel'>
                                    <p className='nameProductPanel'>{user.firstname} {user.lastname}</p>
                                    <span style={{marginRight: '2vmin'}}>{user.email}</span>
                                </div>
                            </div>
                        )
                    })}
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
        // eslint-disable-next-line
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