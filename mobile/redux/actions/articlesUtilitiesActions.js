import axios from "axios"
const HOST = "https://lodotechgames.herokuapp.com"

const articlesUtilitiesActions = {
  getAllArticlesUtilities: () => {
    return async () => {
      try {
        let response = await axios.get(`${HOST}/api/utils`)
        if (!response.data.success) throw new Error(response.data.error)
        return { success: true, response: response.data.response }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default articlesUtilitiesActions
