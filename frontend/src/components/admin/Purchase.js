import React, {useState} from 'react'

const Purchase = ({purchase, articles, direction}) => {

    // purchase.status==='confirmed' ? 'red' : purchase.status==='processing' ? 'orange' : 'green'

    return (
        <div className='purchaseContainerPanel'>
            <p>3333333</p>
            <p style={{textAlign: 'center'}}>{articles.length < 10 ? `0${articles.length}` : articles.length}</p>
            <div className='addressPurchasePanel'>
                <p style={{flex: 1}}>{direction.zipCode} {direction.street} {direction.number} {direction.department} {direction.city}, {direction.state}</p>
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
