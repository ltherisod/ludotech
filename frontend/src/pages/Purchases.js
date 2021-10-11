import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroPages from '../components/HeroPages'

const Purchases = () => {

    const [search, setSearch] = useState('')
    const [purchaseFound, setPurchaseFound] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <div style={{ backgroundImage: "url('https://i.postimg.cc/3wVXYt59/back-Ludo3.png')", backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Header />
            <HeroPages />
            <div className='mainWishlist'>
                <h2 style={{color: 'white'}}>My purchases</h2>
                <div className='searchbarWishlist' >
                    <p>I you have a lot purchases, you can search each one of them here</p>
                    <input type='search' placeholder='Search a purchase...' onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='purchasesUserContainer'>
                    <Purchase />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Purchases


const Purchase = ({purchase}) => {
    const [color, setColor] = useState('red')

    useEffect(() => {
        // purchase.status === 'processing' && setColor('purple')
        // purchase.status === 'confirmed' && setColor('blue')
        // purchase.status === 'cancelled' && setColor('red')
        // purchase.status === 'shipping' && setColor('orange')
        // purchase.status === 'completed' && setColor('green')
    }, [])

    return (
        <div  className='userFoundPurchase'>
            <div className='containerPurchase'>
                <div className='titlesPurchasesUser'>
                    <p>Order ID</p>
                    <p>Address</p>
                    <p>Date</p>
                    <p>Amount</p>
                    <p>Status</p>
                </div>
                <div className='detailsPurchaseUser'>
                    <div>
                        <p>6162577f766de90727eb542c</p>
                    </div>
                    <div>
                        <p>1074 Av. Rivadavia 23454 4B</p>
                        <p>Buenos Aires, CABA</p>
                    </div>
                    <div>
                        <p>2021-10-11</p>
                    </div>
                    <div>
                        <p>$2000.00</p>
                    </div>
                    <div className={`statusPurchasePanel ${color}`}>
                        <p>Processing</p>
                    </div>
                </div>
                {/* <div className='articlesFoundPanel'>
                    {purchase.articles.map(article => {
                        return (
                            <div key={article._id} className='productRow'>
                                <div className='productRowtPicture' style={{backgroundImage: `url("${article.photos[0]}")`}}></div>
                                <div className='detailsProductPanel'>
                                    <p className='nameProductPanel'>{article.name}</p>
                                    <span>
                                        <p style={{marginRight: '2vmin'}}>Price: ${article.price}</p>
                                        <p>Quantity: {article.quantity}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div> */}
            </div>
        </div>
    ) 
}
