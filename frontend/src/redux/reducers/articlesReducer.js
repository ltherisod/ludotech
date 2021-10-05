const articlesReducer = (state = {listArticles: [], listFilteredArticles: []}, action) => {
    switch (action.type) {
        case "GET_ARTICLES":
            return {
                ...state,
                listArticles: action.payload
            }
        default:
            return state
    }
}
export default articlesReducer
