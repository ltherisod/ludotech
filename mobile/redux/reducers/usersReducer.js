const usersReducer = (
  state = { user: false, shoppingCart: [], wishList: [] },
  action
) => {
  switch (action.type) {
    case "LOGIN_OR_SIGNUP":
      const { shoppingCart, wishList, ...user } = action.payload
      return {
        ...state,
        user,
        shoppingCart,
        wishList,
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
    case "PURCHASE":
      return {
        ...state,
        shoppingCart: action.payload.user.shoppingCart,
        wishList: action.payload.user.wishList,
      }
    case "UPDATE_DIRECTIONS":
      return {
        ...state,
        user: { ...state.user, directions: action.payload },
      }
    default:
      return state
  }
}
export default usersReducer
