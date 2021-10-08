import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Sales = () => {

    const [purchases, setPurchases] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [search, setSearch] = useState('')
    const [userFound, setUserFound] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:4000/api/purchases')
            .then(res=> {
                setPurchases(res.data.response)
                console.log(res.data.response)
            })
            .catch(e => console.log(e))
    },[])

    return (
        <div className='mainTeamPanel'>
            <h2>Purchases</h2>
            <div className='searchUserTeam'>
                <label>Search a purchase to more info</label>
                <div className='searchbarTeam'>
                    <input type='search' placeholder='AA919ADSJ' onChange={e => setSearch(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"

                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
                {userFound && <div className='userFoundTeam'>
                    <div className='userPicFoundTeam' style={{backgroundImage: `url("${userFound.photo}")`}}></div>
                    <div className='detailsUserFound'>
                        <div>
                            <p className='bold'>{userFound.firstname} {userFound.lastname}</p>
                            <p>{userFound.email}</p>
                        </div>
                        <div>
                            <div  style={{display: 'flex', alignItems: 'center'}}>
                                <label className='bold'>Rol: </label>
                                <p>{userFound.isAdmin ? ' Admin' : ' User'}</p>
                            </div>
                            {!userFound.isAdmin && <div onClick={() =>{}} className='saveTeam'>Give admin</div>}
                        {userFound.isAdmin && <div disabled className='saveTeam' style={{backgroundColor: 'rgba(0,0,0,0.3)', cursor: 'default'}}>Give admin</div>}
                        </div>
                    </div>
                </div>}
                {notFound && <span className='userDontFoundTeam'>Dont exist an user with that email</span>}
            </div>
            <div className='purchasesContainerPanel'>
                <div className='titlesPurchasesPanel'>
                    <div>
                        <p>Photo</p>
                    </div>
                    <div>
                        <p>Details</p>
                    </div>
                    <div>
                        <p>Date</p>
                    </div>
                    <div>
                        <p>Tracking</p>
                    </div>
                    <div>
                        <p>Amount</p>
                    </div>
                </div>
                <div className='purchasesPanel'>
                    {purchases.map(purchase => {
                        console.log(purchase.articles[0].photos[0])
                        return (
                            <div key={purchase._id} className='purchaseContainerPanel'>
                                <div className='purchasePhotoPanel' style={{backgroundImage: `url("${purchase.articles[0].photos[0]}")`}}></div>
                                <div>

                                </div>
                                <div>
                                    <p>{purchase.timestamp.split('T')[0]}</p>
                                </div>
                                <div>
                                    <p></p>
                                </div>
                                <p>${purchase.total}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sales
