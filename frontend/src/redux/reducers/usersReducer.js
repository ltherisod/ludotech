const usersReducer = (
  state = { user: false, shoppingCart: [], wishList: [] },
  action
) => {
  switch (action.type) {
    case "LOGIN_OR_SIGNUP":
      return {
        ...state,
        user: action.payload,
        shoppingCart: action.payload.shoppingCart,
      }
    case "LOG_OUT":
      return {
        ...state,
        user: false,
      }
    case "UPDATE_CART":
      return {
        ...state,
        shoppingCart: action.payload,
      }
    case "WISH_LIST":
      return {
        ...state,
        wishList: action.payload,
      }
    case "UPDATE_DIRECTIONS":
      return {
        ...state,
        user: { ...user, directions: action.payload },
      }
    default:
      return state
  }
}
export default usersReducer
