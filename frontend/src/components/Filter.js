import React, { useState } from "react"

const Filter = () => {
    const [brands, setBrands] = useState(["test", "test2"])
    const [genres, setGenres] = useState(["test", "test2"])
    const [gameTypes, setGameTypes] = useState(["test", "test2"])
    const [renderDropDown, setRenderDropDown] = useState(false)
    const [filter, setFilter] = useState({
        name: "",
        minPrice: 0,
        maxPrice: 1000000000000,
        hasDiscount: false,
        minAge: 0,
        size: "all",
        minPlayers: 1,
        maxPlayers: 1000000000000,
        brand: "all",
        genre: "all",
        gameType: "all"
    })

    const submitFilter = (e) => {
        e.preventDefault()
        console.log("Filter: ", filter)
    }

    const inputHandle = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const inputNumber = (e, defaultNumber) => {
        let number = parseInt(e.target.value)
        if (number<=0 || e.target.value === "") {
            setFilter({
                ...filter,
                [e.target.name]: defaultNumber
            })    
        } else {
            setFilter({
                ...filter,
                [e.target.name]: parseInt(e.target.value)
            })     
        }
    }

    const inputBoolean = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.checked
        })
    }

    const renderOptions = (options) => {
        return(
            options.map(option => {
                return(
                    <option key={option} value={option}>{option}</option>
                )
            })
        )
    }
    
    // console.log(filter)
    return(
        <>
            <form onSubmit={submitFilter} style={{width: "90%", display: "flex", color: "white", margin: "30px"}}>
                <div>
                    <label htmlFor="name">Search a product:</label>
                    <input type="text" id="name" name="name" onChange={inputHandle}/>
                </div>
                {renderDropDown &&
                <div style={{display: "flex", flexWrap: "wrap", marginLeft: "10px"}}>
                    <div>
                        <label htmlFor="minPrice">Min price:</label>
                        <input type="number" min={0} id="minPrice" name="minPrice" onChange={(e) => inputNumber(e, 0)}/>
                    </div>
                    <div>
                        <label  htmlFor="maxPrice">Max price:</label>
                        <input type="number" min={0} id="maxPrice" name="maxPrice" onChange={(e) => inputNumber(e, 1000000000000)}/>
                    </div>
                    <div>
                        <label htmlFor="hasDiscount">With discount</label>
                        <input type="checkbox" id="hasDiscount" name="hasDiscount" onChange={inputBoolean}/>
                    </div>
                    <div>
                        <label htmlFor="minAge">Min age:</label>
                        <input type="number" min={0} id="minAge" name="minAge" onChange={(e) => inputNumber(e, 0)}/>
                    </div>
                    <div>
                        <label htmlFor="minPlayers">Min players:</label>
                        <input type="number" min={0} id="minPlayers" name="minPlayers" onChange={(e) => inputNumber(e, 1)}/>
                    </div>
                    <div>
                        <label  htmlFor="maxPlayers">Max players:</label>
                        <input type="number" min={0} id="maxPlayers" name="maxPlayers" onChange={(e) => inputNumber(e, 1000000000000)}/>
                    </div>
                    <div>
                        <label htmlFor="size">Size:</label>
                        <select name="size" id="size" onChange={inputHandle}>
                            <option value="all">all</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="big">big</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand:</label>
                        <select name="brand" id="brand" onChange={inputHandle}>
                            <option value="all">all</option>
                            {renderOptions(brands)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="genre">Genre:</label>
                        <select name="genre" id="genre" onChange={inputHandle}>
                            <option value="all">all</option>
                            {renderOptions(genres)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gameType">Game type:</label>
                        <select name="gameType" id="gameType" onChange={inputHandle}>
                            <option value="all">all</option>
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

export default Filter