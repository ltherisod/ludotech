const usersReducer = (state = {token: null, name: null, surname: null, image: null, userId: null}, action) => {
    switch (action.type) {
        case "LOGIN_OR_SIGNUP":
            return {
               token: action.payload.token,
               name: action.payload.name,
               surname: action.payload.surname,
               image: action.payload.image,
               userId: action.payload.userId
            }
        case "LOG_OUT":
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