import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import articlesActions from "../redux/actions/articlesActions"
import articlesUtilitiesActions from "../redux/actions/articlesUtilitiesActions"

export const useArticles = (filters, submit, page) => {
  const [articles, setArticles] = useState({
    articles: [],
    totalCounts: null,
    page: 1,
    totalPages: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchArticles()
  }, [page, submit])

  const fetchArticles = async () => {
    const res = await dispatch(articlesActions.getArticles(filters, page))
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

export const useRelatedArticles = (genres) => {
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    if (genres) {
      if (genres.length !== 0) {
        setError(null)
        setLoadingRelated(true)
        fetchRelatedArticles()
      }
    }
  }, [genres])

  const fetchRelatedArticles = async () => {
    const res = await dispatch(articlesActions.getRelatedArticles(genres[0]._id))
    if (!res.success) {
      setError(res.error)
    } else {
      setRelatedArticles(res.response)
    }
    setLoadingRelated(false)
  }

  return [relatedArticles, loadingRelated, error]
}
