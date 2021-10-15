import axios from "axios"

const HOST = "https://lodotechgames.herokuapp.com"

const articlesActions = {
  getArticles: (filters, page) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${HOST}/api/articles`, {
          filters,
          page: page || 1,
        })
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  getArticle: (articleId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${HOST}/api/article/${articleId}`)
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  addArticle: (data) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${HOST}/api/article`, data, {
          headers: {
            Authorization: `Bearer ${getState().users.user.token}`,
          },
        })
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  updateArticle: (articleId, data) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(
          `${HOST}/api/article/${articleId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  deleteArticle: (articleId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.delete(
          `${HOST}/api/article/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  updateCart: (action, articleId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          `${HOST}/api/user/shopping-cart/${articleId}`,
          { action },
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!response.data.success) throw new Error(response.data.error)
        dispatch({ type: "UPDATE_CART", payload: response.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  resetCart: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(
          `${HOST}/api/user/shopping-cart/reset`,
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!response.data.success) throw new Error(response.data.error)
        dispatch({ type: "UPDATE_CART", payload: response.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  getMostVisitArticles: () => {
    return async () => {
      try {
        const response = await axios.get(`${HOST}/api/mostvisitarticles`)
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  getRelatedArticles: (genreId) => {
    return async () => {
      try {
        const response = await axios.get(
          `${HOST}/api/article/related/${genreId}`
        )
        if (!response.data.success) throw new Error(response.data.error)
        return {
          success: true,
          response: response.data.response,
          error: null,
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  getLastArticles: () => {
    return async () => {
      try {
        let response = await axios.get(`${HOST}/api/last-articles`)
        if (!response.data.success) throw new Error(response.data.error)
        return { success: true, response: response.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default articlesActions
