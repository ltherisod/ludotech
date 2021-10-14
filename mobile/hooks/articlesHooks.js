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
    setLoading(true)
    setError(null)
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
  }, [id])

  return [article, loading, error]
}

export const useUtils = () => {
  const [utils, setUtils] = useState({ brands: [], gameTypes: [], genres: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    getUtils()
     // eslint-disable-next-line
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
    const res = await dispatch(
      articlesActions.getRelatedArticles(genres[0]._id)
    )
    if (!res.success) {
      setError(res.error)
    } else {
      setRelatedArticles(res.response)
    }
    setLoadingRelated(false)
  }

  return [relatedArticles, loadingRelated, error]
}

export const useFilters = () => {
  const [filters, setFilters] = useState({})

  const inputHandle = (e) => {
    if (e !== "") {
      setFilters({
        ...filters,
        name: e,
      })
    } else {
      delete filters.name
    }
  }

  const inputSize = (e) => {
    if (e !== "") {
      setFilters({
        ...filters,
        size: e,
      })
    } else {
      delete filters.size
    }
  }

  const inputBrand = (e) => {
    if (e !== "") {
      setFilters({
        ...filters,
        brand: e,
      })
    } else {
      delete filters.brand
    }
  }

  const inputGenre = (e) => {
    if (e !== "") {
      setFilters({
        ...filters,
        genres: e,
      })
    } else {
      delete filters.genres
    }
  }

  const inputGameType = (e) => {
    if (e !== "") {
      setFilters({
        ...filters,
        gameType: e,
      })
    } else {
      delete filters.gameType
    }
  }

  const inputBoolean = (e) => {
    if (e) {
      setFilters({
        ...filters,
        hasDiscount: true,
      })
    } else {
      delete filters.hasDiscount
    }
  }

  const inputPrice = (e) => {
    switch (e) {
      case "0-10":
        setFilters({
          ...filters,
          minPrice: 0,
          maxPrice: 10,
        })
        break
      case "11-20":
        setFilters({
          ...filters,
          minPrice: 11,
          maxPrice: 20,
        })
        break
      case "21-40":
        setFilters({
          ...filters,
          minPrice: 21,
          maxPrice: 40,
        })
        break
      case "41-60":
        setFilters({
          ...filters,
          minPrice: 41,
          maxPrice: 60,
        })
        break
      case "61-80":
        setFilters({
          ...filters,
          minPrice: 61,
          maxPrice: 80,
        })
        break
      case "81-100":
        setFilters({
          ...filters,
          minPrice: 81,
          maxPrice: 100,
        })
        break
      case "101-120":
        setFilters({
          ...filters,
          minPrice: 101,
          maxPrice: 120,
        })
        break
      case "121orMore":
        delete filters.maxPrice
        setFilters({
          ...filters,
          minPrice: 121,
        })
        break
      default:
        delete filters.minPrice
        delete filters.maxPrice
    }
  }

  const inputMinAge = (e) => {
    switch (e) {
      case "three":
        setFilters({
          ...filters,
          minAge: 3,
        })
        break
      case "six":
        setFilters({
          ...filters,
          minAge: 6,
        })
        break
      case "nine":
        setFilters({
          ...filters,
          minAge: 9,
        })
        break
      case "twelve":
        setFilters({
          ...filters,
          minAge: 12,
        })
        break
      case "sexteenOrMore":
        setFilters({
          ...filters,
          minAge: 16,
        })
        break
      default:
        delete filters.minAge
    }
  }

  const inputPlayers = (e) => {
    switch (e) {
      case "one":
        setFilters({
          ...filters,
          minPlayers: 1,
          maxPlayers: 1,
        })
        break
      case "2-4":
        setFilters({
          ...filters,
          minPlayers: 2,
          maxPlayers: 4,
        })
        break
      case "5-8":
        setFilters({
          ...filters,
          minPlayers: 5,
          maxPlayers: 8,
        })
        break
      case "nineOrMore":
        delete filters.maxPlayers
        setFilters({
          ...filters,
          minPlayers: 9,
        })
        break
      default:
        delete filters.minPlayers
        delete filters.maxPlayers
    }
  }
  return {
    filters,
    inputPrice,
    inputBoolean,
    inputHandle,
    inputMinAge,
    inputPlayers,
    inputSize,
    inputBrand,
    inputGenre,
    inputGameType,
    setFilters
  }
}