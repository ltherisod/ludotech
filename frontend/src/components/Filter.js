import React, { useState, useEffect } from "react"
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

   const [articles, loading, error] = useArticles(filters, submit)
   console.log(articles, loading, error)

   useEffect(() => {
      props.filterArticles(articles)
   }, [articles])

   useEffect(() => {
      props
         .getAllArticlesUtilities()
         .then((res) => {
            if (res.success) {
               setBrands([...res.response.brands])
               setGenres([...res.response.genres])
               setGameTypes([...res.response.gameTypes])
            } else {
               throw new Error()
            }
         })
         .catch((e) => console.log(e))
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

   const renderOptions = (options) => {
      return options.map((option) => {
         return (
            <option key={option._id} value={option._id}>
               {option.name}
            </option>
         )
      })
   }

   const submitFilters = (e) => {
      e.preventDefault()
      // console.log("Filters: ", filters)
      setSubmit(!submit)
   }

   console.log(filters)
   return (
      <div className="filterUltracontainer">
         <form
            className="filterBoxContainer"
            onSubmit={submitFilters}
            style={{ width: "80%", display: "flex", color: "white" }}
         >
            <div className="search">
               <label htmlFor="name">Search a product</label>
               <input
                  type="search"
                  id="name"
                  name="name"
                  onChange={inputHandle}
               />
            </div>
               <>
                  <div className="filtersBox" id={renderDropDown ? "visible" : "hidden"}>
                     <div className="filterOption">
                        <label htmlFor="price">Price:</label>
                        <select name="price" id="price" onChange={inputPrice} >
                           <option>all</option>
                           <option value="0-10">0 - $10</option>
                           <option value="11-20">$11 - $20</option>
                           <option value="21-40">$21 - $40</option>
                           <option value="41-60">$41 - $60</option>
                           <option value="61-80">$61 - $80</option>
                           <option value="81-100">$81 - $100</option>
                           <option value="101-120">$101 - $120</option>
                           <option value="121orMore">$121 or more</option>
                        </select>
                     </div>
                     <div className="filterOption">
                        <label htmlFor="minAge">Min age:</label>
                        <select
                           name="minAge"
                           id="minAge"
                           onChange={inputMinAge}
                        >
                           <option>all</option>
                           <option value="three">3</option>
                           <option value="six">6</option>
                           <option value="nine">9</option>
                           <option value="twelve">12</option>
                           <option value="sexteenOrMore">16 or more</option>
                        </select>
                     </div>
                     <div className="filterOption">
                        <label htmlFor="players">Players:</label>
                        <select
                           name="players"
                           id="players"
                           onChange={inputPlayers}
                        >
                           <option>all</option>
                           <option value="one">one</option>
                           <option value="2-4">2 - 4</option>
                           <option value="5-8">5 - 8</option>
                           <option value="nineOrMore">9 or more</option>
                        </select>
                     </div>
                     <div className="filterOption">
                        <label htmlFor="size">Size:</label>
                        <select name="size" id="size" onChange={inputHandle}>
                           <option value="">all</option>
                           <option value="Small">Small</option>
                           <option value="Medium">Medium</option>
                           <option value="Large">Large</option>
                        </select>
                     </div>
                     <div className="filterOption">
                        <label htmlFor="brand">Brand:</label>
                        <select name="brand" id="brand" onChange={inputHandle}>
                           <option value="">all</option>
                           {renderOptions(brands)}
                        </select>
                     </div>
                     <div className="filterOption">
                        <label htmlFor="genre">Genre:</label>
                        <select name="genres" id="genre" onChange={inputHandle}>
                           <option value="">all</option>
                           {renderOptions(genres)}
                        </select>
                     </div>
                     <div className="filterOption">
                        <label htmlFor="gameType">Game type:</label>
                        <select
                           name="gameType"
                           id="gameType"
                           onChange={inputHandle}
                        >
                           <option value="">all</option>
                           {renderOptions(gameTypes)}
                        </select>
                     </div>
                  </div>
                  <div className="filterDiscount" id={renderDropDown ? "visible" : "hidden"}>
                     <label htmlFor="hasDiscount">With discount</label>
                     <input
                        type="checkbox"
                        id="hasDiscount"
                        name="hasDiscount"
                        onChange={inputBoolean}
                     />
                  </div>
               </>

            <input
               className="searchButton"
               style={{
                  backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
               }}
               type="submit"
               value="Filter"
            />
         </form>
         <button
            className="filterView"
            onClick={() => {
               setRenderDropDown(!renderDropDown)
            }}
         >
            {renderDropDown ? "- FILTERS" : "+ FILTERS"}
         </button>
      </div>
   )
}

const mapDispatchToProps = {
   getAllArticlesUtilities: articlesUtilitiesActions.getAllArticlesUtilities,
}

export default connect(null, mapDispatchToProps)(Filter)
