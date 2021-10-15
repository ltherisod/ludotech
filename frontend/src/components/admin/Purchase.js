import React, {useState, useEffect} from 'react'

const Purchase = ({purchase, showPurchase}) => {

    const {direction, purchaseFound, status} = purchase

    const [color, setColor] = useState('red')

    useEffect(() => {
        purchase.status === 'processing' && setColor('purple')
        purchase.status === 'confirmed' && setColor('blue')
        purchase.status === 'cancelled' && setColor('red')
        purchase.status === 'shipping' && setColor('orange')
        purchase.status === 'completed' && setColor('green')
    }, [purchaseFound, status])

    return (
        <div onClick={(e) => showPurchase(purchase)} className='purchaseContainerPanel'>
            <div>
                <p>...{purchase._id.substring(18, 24 )}</p>
            </div>
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className='articleDashboard' style={{backgroundImage: `url("${purchase.articles[0].photos[0]}")`}}></div>
                    <p>{purchase.articles.length > 1 && `+${purchase.articles.length-1}`}</p>
                </div>
            </div>
            <div className='addressPurchasePanel'>
                <p style={{flex: 1}}>{direction.zipCode} {direction.street} {direction.number} {direction.department}</p>
                <p>{direction.city}, {direction.state}</p>
            </div>
            <div className=''>
                {purchase.timestamp && <p>{purchase.timestamp.split('T')[0]}</p>}
            </div>
            <p>${purchase.total.toFixed(2)}</p>
            <div className={`statusPurchasePanel ${color}`}>
                <p>{purchase.status}</p>
            </div>
        </div>
    )
}

export default Purchase
