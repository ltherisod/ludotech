import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import articlesActions from "../redux/actions/articlesActions"

export const useArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const res = await dispatch(articlesActions.getArticles)
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

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    const res = await dispatch(articlesActions.getArticle(id))
    if (!res.success) {
      setError(res.error)
    } else {
      setArticle(res.response)
    }
    setLoading(false)
  }

  return [article, loading, error]
}
