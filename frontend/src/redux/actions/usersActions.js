import axios from "axios"

const HOST = "http://localhost:4000"

const usersActions = {
  logInOrSignUp: (data, action) => {
    return async (dispatch) => {
      try {
        // action puede ser 'login' o 'signup'
        const response = await axios.post(`${HOST}/api/${action}`, data)
        if (!response.data.success) throw new Error(response.data.error)
        localStorage.setItem("token", response.data.response.token)
        dispatch({ type: "LOGIN_OR_SIGNUP", payload: response.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  logOut: () => {
    return (dispatch) => {
      localStorage.removeItem("token")
      dispatch({ type: "LOG_OUT" })
    }
  },
  logInLS: (token) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${HOST}/api/user/verifyToken`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.data.success) throw new Error(response.data.error)
        dispatch({
          type: "LOGIN_OR_SIGNUP",
          payload: { ...response.data.response, token },
        })
        return {success: true, error: null}
      } catch (e) {
        localStorage.removeItem("token")
        return { success: false, error: e.message }
      }
    }
  },
  updateAccount: (data) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(
          `${HOST}/api/user/${getState().users.user._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (!response.data.success) throw new Error(response.data.error)
        dispatch({ type: "LOGIN_OR_SIGNUP", payload: response.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  toggleWishList: (articleId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          `${HOST}/api/user/wish-list/${articleId}`,
          {},
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "WISH_LIST", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
}

export default usersActions
