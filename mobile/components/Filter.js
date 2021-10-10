import React, { useState, useEffect } from "react"
import {View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet} from "react-native"
import { connect } from "react-redux"
import articlesUtilitiesActions from "../redux/actions/articlesUtilitiesActions"
import { useArticles } from "../hooks/articlesHooks"

const Filter = (props) => {
    const [brands, setBrands] = useState([])
    const [genres, setGenres] = useState([])
    const [gameTypes, setGameTypes] = useState([])
    const [renderDropDown, setRenderDropDown] = useState(false)
    const [filters, setFilters] = useState({})
    const [submit, setSubmit] = useState(false)
    const [values, setValues] = useState({})
  
    const [articles, loading, error] = useArticles(
      filters,
      submit,
      props.currentPage
    )
  
    useEffect(() => {
      props.filterArticles(articles)
    }, [articles])
    
    useEffect(() => {
        // props
        //   .getAllArticlesUtilities()
        //   .then((res) => {
        //     if (res.success) {
        //       setBrands([...res.response.brands])
        //       setGenres([...res.response.genres])
        //       setGameTypes([...res.response.gameTypes])
        //     } else {
        //       throw new Error()
        //     }
        //   })
        //   .catch((e) => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
        
    const inputHandle = (e) => {
        if (e.target.value !== "") {
          setFilters({
            ...filters,
            [e.target.name]: e.target.value,
          })
        } else {
          delete filters[e.target.name]
        }
    }

    const inputBoolean = (e) => {
        if (e.target.checked) {
          setFilters({
            ...filters,
            hasDiscount: true,
          })
        } else {
          delete filters.hasDiscount
        }
    }
    
    const inputPrice = (e) => {
        switch (e.target.value) {
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
                setFilters({
                    ...filters,
                    minPrice: 121,
                })
                delete filters.maxPrice
            break
            default:
                delete filters.minPrice
                delete filters.maxPrice
        }
    }
    
    const inputMinAge = (e) => {
        switch (e.target.value) {
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
        switch (e.target.value) {
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
                setFilters({
                    ...filters,
                    minPlayers: 9,
                })
                delete filters.maxPlayers
            break
            default:
                delete filters.minPlayers
                delete filters.maxPlayers
        }
    }
    
    // const renderOptions = (options) => {
    //     return options.map((option) => {
    //       return (
    //         <option key={option._id} value={option._id}>
    //           {option.name}
    //         </option>
    //       )
    //     })
    // }

    const submitFilters = (e) => {
        e.preventDefault()
        props.setCurrentPage(1)
        setSubmit(!submit)
    }

    return(
        <View>
            <Text>Filtro WIP</Text>
        </View>
    )
}

export default connect(null, mapDispatchToProps)(Filter)

const mapDispatchToProps = {
    getAllArticlesUtilities: articlesUtilitiesActions.getAllArticlesUtilities,
}

const styles = StyleSheet.create({

})