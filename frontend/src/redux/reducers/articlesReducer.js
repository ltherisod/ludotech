const articlesReducer = (state = { shoppingCart: [] }, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      console.log(action.payload)
      return {
        state
        
      }
    default:
      return state
  }
}
export default articlesReducer
