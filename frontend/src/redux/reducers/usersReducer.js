const usersReducer = (state = { user: false }, action) => {
  switch (action.type) {
    case "LOGIN_OR_SIGNUP":
      return {
        ...state,
        user: action.payload,
      }
    case "LOG_OUT":
      return {
        ...state,
        user: false,
      }
    default:
      return state
  }
}
export default usersReducer
