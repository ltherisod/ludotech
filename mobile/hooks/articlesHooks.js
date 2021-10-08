import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import articlesActions from "../redux/actions/articlesActions"
import articlesUtilitiesActions from "../redux/actions/articlesUtilitiesActions"

export const useArticles = (filters, submit) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchArticles()
  }, [submit])

  const fetchArticles = async () => {
    const res = await dispatch(articlesActions.getArticles(filters))
    if (!res.success) setError(res.error)
    setLoading(false)
    setArticles(res.response)
  }
  return [articles, loading, error]
}

export const useArticle = (id) => {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const fetchArticle = async () => {
    const res = await dispatch(articlesActions.getArticle(id))
    if (!res.success) {
      setError(res.error)
    } else {
      setArticle(res.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchArticle()
  }, [])

  return [article, loading, error]
}

export const useUtils = () => {
  const [utils, setUtils] = useState({ brands: [], gameTypes: [], genres: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    getUtils()
  }, [])

  const getUtils = async () => {
    const res = await dispatch(
      articlesUtilitiesActions.getAllArticlesUtilities()
    )
    if (!res.success) {
      setError(res.error)
    } else {
      setUtils(res.response)
    }
    setLoading(false)
  }
  return [utils, loading, error]
}
