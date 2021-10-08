import axios from "axios"

const usersAction = {
    signUp: (newUser) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://192.168.0.103:4000/api/user/account", {...newUser})
                if (response.data.success) {
                    dispatch({type: "LOGIN_OR_SIGNUP", payload: response.data.response})
                    return{success: true}
                } else {
                    return{success: false, error: response.data.error}
                }
            } catch (e) {
                console.log(e)
                return{success: false, error: [{path: ["failAPI"], message: "Fail to connect with the API"}]}
            }
        }
    },
    logIn: (logInUser) => {
        return async (dispatch) => {
            try {
                let response = await axios.post("http://192.168.0.103:4000/api/user/logIn", {...logInUser})
                if (response.data.success) {
                    dispatch({type: "LOGIN_OR_SIGNUP", payload: response.data.response})
                    return{success: true}
                } else {
                    throw new Error(response.data.error)
                }
            } catch (e) {
                return{success: false, error: e.message}
            }
        }
    },
    logOut: () => {
        return (dispatch) => {
            dispatch({ type: "LOG_OUT"})
        }
    },
}
export default usersAction