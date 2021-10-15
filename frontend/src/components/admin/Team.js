import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Team = () => {

    const [notFound, setNotFound] = useState(false)
    const [members, setMembers] = useState([])
    const [search, setSearch] = useState('')
    const [userFound, setUserFound] = useState(false)

    useEffect(() => {
        axios.get('https://lodotechgames.herokuapp.com/api/admin',{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res=> {
                setMembers(res.data.response)
            })
            .catch(e => console.log(e))
            // eslint-disable-next-line
    },[])

    const getUser = () => {
        axios.post('https://lodotechgames.herokuapp.com/api/admin', {email: search},{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                if(res.data.response) {
                    setUserFound(res.data.response)
                    setNotFound(false)
                } else {
                    setUserFound(false)
                    setNotFound(true)
                }
            })
            .catch(e => {
                console.log(e)
                setNotFound(true)
            })
    }

    const changeRol = () => {
        axios.post(
            'https://lodotechgames.herokuapp.com/api/admin/set-admin', 
            {email: userFound.email},
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}} 
        )
            .then(res => {
                setUserFound(false)
                if(!userFound.isAdmin) {
                    setMembers([...members, res.data.response])
                } else {
                    let membersFiltered = members.filter(member => {
                        return member.email !== userFound.email
                    })
                    setMembers(membersFiltered)
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <div className='mainTeamPanel' style={{ backgroundImage: "url('https://i.postimg.cc/zDhycDV6/fondoblanco2.png')" }}>
            <h2>Ludotech team</h2>
            <div className='searchUserTeam'>
                <label>Search an user to give it an admin rol</label>
                <div className='searchbarTeam'>
                    <input type='search' placeholder='example@email.com' onChange={e => setSearch(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                        onClick={getUser}
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
                            {!userFound.isAdmin && <div onClick={() => changeRol()} className='saveTeam'>Give admin</div>}
                            {userFound.isAdmin && <div onClick={() => changeRol()} className='deleteTeam'>Remove admin</div>}
                        </div>
                    </div>
                </div>}
                {notFound && <span className='userDontFoundTeam'>Dont exist an user with that email</span>}
            </div>
            <div>
                <p className='subtitleTeam'>Members</p>
                <div className='cardsTeam'>
                    {members && members.map( member => {
                        return (
                            <div key={member._id} className='cardTeam'>
                                <div className='picCardTeam' style={{backgroundImage: `url("${member.photo}")`}}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className='detailsCardTeam'>
                                    <p>{member.firstname} {member.lastname}</p>
                                    <span>{member.email}</span>
                                </div>
                            </div>
                        )
                    })}                   
                    
                </div>
            </div>
        </div>
    )
}

export default Team
