import React, {useState, useEffect} from 'react'

const Purchase = ({purchase, articles, direction, showPurchase, purchaseFound}) => {

    const [color, setColor] = useState('red')

    useEffect(() => {
        purchase.status === 'processing' && setColor('purple')
        purchase.status === 'confirmed' && setColor('blue')
        purchase.status === 'cancelled' && setColor('red')
        purchase.status === 'shipping' && setColor('orange')
        purchase.status === 'completed' && setColor('green')
    }, [purchaseFound])

    return (
        <div onClick={() => showPurchase(purchase._id)} className='purchaseContainerPanel'>
            <div>
                <p>...{purchase._id.substring(18, 24 )}</p>
            </div>
            <p style={{textAlign: 'center'}}>{articles.length < 10 ? `0${articles.length}` : articles.length}</p>
            <div className='addressPurchasePanel'>
                <p style={{flex: 1}}>{direction.zipCode} {direction.street} {direction.number} {direction.department}</p>
                <p>{direction.city}, {direction.state}</p>
            </div>
            <div className=''>
                {purchase.timestamp && <p>{purchase.timestamp.split('T')[0]}</p>}
            </div>
            <p>${purchase.total}.00</p>
            <div className={`statusPurchasePanel ${color}`}>
                <p>{purchase.status}</p>
            </div>
        </div>
    )
}

export default Purchase
