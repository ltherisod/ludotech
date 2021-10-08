import React, {useState} from 'react'

const Purchase = ({purchase, articles, direction}) => {

    const [seeProducts, setSeeProducts] = useState(false)
    // purchase.status==='confirmed' ? 'red' : purchase.status==='processing' ? 'orange' : 'green'

    return (
        <div key={purchase._id} className='purchaseContainerPanel'>
            <p>#33832042</p>
            <div className={`numberArticlesPanel`} onClick={() => setSeeProducts(true)} onMouseLeave={() => setSeeProducts(false)}>
                    <p>see {articles.length} products</p>
                    {seeProducts && 
                    <div className='containerProductsPanel'>
                        <div style={{backgroundImage: `url("${articles[0].photos[0]}")`}}></div>
                        {articles.length > 1 && <div style={{backgroundImage: `url("${articles[1].photos[0]}")`}}></div>}
                        {articles.length > 2 && <div style={{backgroundImage: `url("${articles[2].photos[0]}")`}}></div>}
                        {articles.length > 3 && <div style={{backgroundImage: `url("${articles[3].photos[0]}")`}}></div>}
                        <div>{articles.length < 5 ? articles.length : `+${articles.length-4}`}</div>
                    </div>}
            </div>
            <div className='addressPurchasePanel'>
                <p>{direction.zipCode} {direction.street} {direction.number} {direction.department} {direction.city}, {direction.state}</p>
            </div>
            <div className=''>
                {purchase.timestamp && <p>{purchase.timestamp.split('T')[0]}</p>}
            </div>
            <p>${purchase.total}.00</p>
            <div className={`statusPurchasePanel ${'red'}`}>
                <p>Processing</p>
            </div>
        </div>
    )
}

export default Purchase
