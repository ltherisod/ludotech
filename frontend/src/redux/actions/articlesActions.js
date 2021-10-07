import axios from "axios"

const HOST = "http://localhost:4000"

const articlesActions = {
   getArticles: () => {
      return async (dispatch) => {
         try {
            const response = await axios.get(`${HOST}/api/articles`)
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
   addArticle: (data, articleId) => {
      return async (dispatch, getState) => {
         try {
            const response = await axios.post(
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
   addToCart: () => {
      return async (dispatch, getState) => {
         try {
            console.log("uwu")
         } catch (e) {
            return { success: false, response: null, error: e.message }
         }
      }
   },
   removeFromCart: () => {
      return async (dispatch, getState) => {
         try {
            console.log("uwu")
         } catch (e) {
            return { success: false, error: e.message }
         }
      }
   },
}

export default articlesActions
