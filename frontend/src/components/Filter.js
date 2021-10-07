import React, { useState, useEffect } from "react"
import {connect} from "react-redux"
import articlesUtilitiesActions from "../redux/actions/articlesUtilitiesActions"
import {useArticles} from "../hooks/articlesHooks"

const Filter = (props) => {
    const [brands, setBrands] = useState([])
    const [genres, setGenres] = useState([])
    const [gameTypes, setGameTypes] = useState([])
    const [renderDropDown, setRenderDropDown] = useState(false)
    const [filters, setFilters] = useState({})
    const [submit, setSubmit] = useState(false)


    const [articles, loading, error] = useArticles(filters, submit)
    console.log(articles, loading, error)

    useEffect(() => {
        props.getAllArticlesUtilities()
        .then(res => {
            if (res.success) {
                setBrands([...res.response.brands])
                setGenres([...res.response.genres])
                setGameTypes([...res.response.gameTypes])
            } else {
                throw new Error()
            }
        })
        .catch(e => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandle = (e) => {
        if (e.target.value !== "") {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value
            })
        } else {
            delete filters[e.target.name]
        }
    }

    const inputBoolean = (e) => {
        if (e.target.checked) {
            setFilters({
                ...filters,
                hasDiscount: true
            })
        } else {
            delete filters.hasDiscount
        }
    }

    const inputPrice = (e) => {
        switch (e.target.value) {
            case "0-500": 
            setFilters({
                ...filters,
                minPrice: 0,
                maxPrice: 500
            })
            break
            case "501-1000": 
            setFilters({
                ...filters,
                minPrice: 501,
                maxPrice: 1000
            })
            break
            case "1001-2000": 
            setFilters({
                ...filters,
                minPrice: 1001,
                maxPrice: 2000
            })
            break
            case "2001-4000": 
            setFilters({
                ...filters,
                minPrice: 2001,
                maxPrice: 4000
            })
            break
            case "4001-8000": 
            setFilters({
                ...filters,
                minPrice: 4001,
                maxPrice: 8000
            })
            break
            case "8001orMore": 
            setFilters({
                ...filters,
                minPrice: 8001
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
                minAge: 3
            })
            break
            case "six": 
                setFilters({
                    ...filters,
                    minAge: 6
                })
            break
            case "nine": 
                setFilters({
                    ...filters,
                    minAge: 9
                })
            break
            case "12orMore": 
                setFilters({
                    ...filters,
                    minAge: 12
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
                    maxPlayers: 1
                })
            break
            case "2-4":
                setFilters({
                    ...filters,
                    minPlayers: 2,
                    maxPlayers: 4
                })
            break
            case "5-8":
                setFilters({
                    ...filters,
                    minPlayers: 5,
                    maxPlayers: 8
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

    const renderOptions = (options) => {
        return(
            options.map(option => {
                return(
                    <option key={option._id} value={option._id}>{option.name}</option>
                )
            })
        )
    }

    const submitFilters = (e) => {
        e.preventDefault()
        // console.log("Filters: ", filters)
        setSubmit(!submit)
    }
    
    return(
        <>
            <form onSubmit={submitFilters} style={{width: "90%", display: "flex", color: "white", margin: "30px"}}>
                <div>
                    <label htmlFor="name">Search a product:</label>
                    <input type="text" id="name" name="name" onChange={inputHandle}/>
                </div>
                {renderDropDown &&
                <div style={{display: "flex", flexWrap: "wrap", marginLeft: "10px"}}>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <select name="price" id="price" onChange={inputPrice}>
                            <option>all</option>
                            <option value="0-500">0 - 500</option>
                            <option value="501-1000">501 - 1000</option>
                            <option value="1001-2000">1001 - 2000</option>
                            <option value="2001-4000">2001 - 4000</option>
                            <option value="4001-8000">4001 - 8000</option>
                            <option value="8001orMore">8001 or more</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="hasDiscount">With discount</label>
                        <input type="checkbox" id="hasDiscount" name="hasDiscount" onChange={inputBoolean}/>
                    </div>
                    <div>
                        <label htmlFor="minAge">Min age:</label>
                        <select name="minAge" id="minAge" onChange={inputMinAge}>
                            <option>all</option>
                            <option value="three">3</option>
                            <option value="six">6</option>
                            <option value="nine">9</option>
                            <option value="12orMore">12 or more</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="players">Players:</label>
                        <select name="players" id="players" onChange={inputPlayers}>
                            <option>all</option>
                            <option value="one">one player</option>
                            <option value="2-4">2 - 4 players</option>
                            <option value="5-8">5 - 8 players</option>
                            <option value="nineOrMore">9 or more players</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="size">Size:</label>
                        <select name="size" id="size" onChange={inputHandle}>
                            <option value="">all</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="big">big</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand:</label>
                        <select name="brand" id="brand" onChange={inputHandle}>
                            <option value="">all</option>
                            {renderOptions(brands)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="genre">Genre:</label>
                        <select name="genre" id="genre" onChange={inputHandle}>
                            <option value="">all</option>
                            {renderOptions(genres)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gameType">Game type:</label>
                        <select name="gameType" id="gameType" onChange={inputHandle}>
                            <option value="">all</option>
                            {renderOptions(gameTypes)}
                        </select>
                    </div>
                </div>
                }
                <input type="submit" value="Filter"/>
            </form>
            <button onClick={() => {setRenderDropDown(!renderDropDown)}}>
                {renderDropDown ? "View less filters" : "View more filters"}
            </button>
        </>
    )
}

const mapDispatchToProps = {
    getAllArticlesUtilities: articlesUtilitiesActions.getAllArticlesUtilities
}

export default connect(null, mapDispatchToProps)(Filter)