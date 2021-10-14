import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import articlesUtilitiesActions from "../redux/actions/articlesUtilitiesActions"
import { useArticles, useFilters, useUtils } from "../hooks/articlesHooks"

const Filter = (props) => {
   const [{ brands, genres, gameTypes }, loadingUtils, erroUtils] = useUtils()
   const [submit, setSubmit] = useState(false) // es para hacer un refetch
   const {
      filters,
      inputPrice,
      inputBoolean,
      inputHandle,
      inputMinAge,
      inputPlayers,
   } = useFilters()
   const [articles, loading, error] = useArticles(
      filters,
      submit,
      props.currentPage
   )

   useEffect(() => {
      props.setLoadingArticles?.(loading)
      // eslint-disable-next-line
   }, [loading])

   useEffect(() => {
      props.filterArticles(
         articles ?? {
            articles: [],
            page: 1,
            totalCounts: null,
            totalPages: 1,
         }
      )
      // eslint-disable-next-line
   }, [articles])

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
      props.setCurrentPage(1)
      setSubmit(!submit)
   }
   return (
      <div className="filterUltracontainer">
         <form
            className="filterBoxContainer"
            onSubmit={submitFilters}
            style={{ width: "80%", display: "flex", color: "white" }}
         >
            <div className="search">
               <label htmlFor="name">
                  Search <span className="spanOrange">a</span> product
               </label>
               <input
                  type="search"
                  id="name"
                  name="name"
                  onChange={inputHandle}
               />
            </div>
            <>
               <div className="filtersBox">
                  <div className="filterOption">
                     <label htmlFor="price">
                        <span className="spanCeleste">Price</span>
                     </label>
                     <select name="price" id="price" onChange={inputPrice}>
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
                     <label htmlFor="minAge">Min age</label>
                     <select name="minAge" id="minAge" onChange={inputMinAge}>
                        <option>all</option>
                        <option value="three">3</option>
                        <option value="six">6</option>
                        <option value="nine">9</option>
                        <option value="twelve">12</option>
                        <option value="sexteenOrMore">16 or more</option>
                     </select>
                  </div>
                  <div className="filterOption">
                     <label htmlFor="players">
                        <span className="spanCeleste">Players</span>
                     </label>
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
                     <label htmlFor="size">Size</label>
                     <select name="size" id="size" onChange={inputHandle}>
                        <option value="">all</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                     </select>
                  </div>
                  <div className="filterOption">
                     <label htmlFor="brand">
                        <span className="spanCeleste">Brand</span>
                     </label>
                     <select name="brand" id="brand" onChange={inputHandle}>
                        <option value="">all</option>
                        {renderOptions(brands)}
                     </select>
                  </div>
                  <div className="filterOption">
                     <label htmlFor="genre">Genre</label>
                     <select name="genres" id="genre" onChange={inputHandle}>
                        <option value="">all</option>
                        {renderOptions(genres)}
                     </select>
                  </div>
                  <div className="filterOption">
                     <label htmlFor="gameType">
                        <span className="spanCeleste">Game type</span>
                     </label>
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
               <div className="filterDiscount">
                  <label htmlFor="hasDiscount">
                     <span className="spanOrange">With discount</span>
                  </label>
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
      </div>
   )
}

const mapDispatchToProps = {
   getAllArticlesUtilities: articlesUtilitiesActions.getAllArticlesUtilities,
}

export default connect(null, mapDispatchToProps)(Filter)
