import React from 'react'

const Notifications = (props) => {

    const not =  [{src: 'https://hiperlibertad.vteximg.com.br/arquivos/ids/178443-1000-1000/MONOPOLY-CLASICO-1-9232.jpg?v=637560194297530000', text: 'Compraste Monopoly Millonaire'},{src: 'https://hiperlibertad.vteximg.com.br/arquivos/ids/178443-1000-1000/MONOPOLY-CLASICO-1-9232.jpg?v=637560194297530000', text: 'Compraste Monopoly Millonaire'},{src: 'https://hiperlibertad.vteximg.com.br/arquivos/ids/178443-1000-1000/MONOPOLY-CLASICO-1-9232.jpg?v=637560194297530000', text: 'Compraste Monopoly Millonaire'}]

    return (
        <div className='notificationsHeader'>
            <h5>Notifications</h5>
            {not.map(o => {
                return (
                    <div className='notificationHeader'>
                        <div className='iconNoti' style={{backgroundImage: `url("${o.src}")`}}></div>
                        <p>{o.text}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Notifications
