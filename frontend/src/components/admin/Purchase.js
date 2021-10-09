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
                        {articles.map(article => {
                            return (
                                <div className='productRow'>
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
