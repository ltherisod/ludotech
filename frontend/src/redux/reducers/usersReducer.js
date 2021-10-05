const usersReducer = (state = {token: null, name: null, surname: null, image: null, userId: null}, action) => {
    switch (action.type) {
        case "LOGIN_OR_SIGNUP":
            localStorage.setItem('name', action.payload.name)
            localStorage.setItem('surname', action.payload.surname)
            localStorage.setItem('image', action.payload.image)
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userId', action.payload.userId)
            return {
               token: action.payload.token,
               name: action.payload.name,
               surname: action.payload.surname,
               image: action.payload.image,
               userId: action.payload.userId
            }
        case "LOG_OUT":
            localStorage.removeItem('name')
            localStorage.removeItem('surname')
            localStorage.removeItem('image')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            return {
                name: null,
                surname: null,
                image: null,
                token: null,
                userId: null
            }   
        default:
            return state
    }
}
export default usersReducer