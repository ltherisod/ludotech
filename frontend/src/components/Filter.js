import React, { useState } from "react"

const Filter = () => {
    const [renderDropDown, setRenderDropDown] = useState(false)
    const [filter, setFilter] = useState({
        name: "",
        minPrice: 0,
        maxPrice: 1000000000000,
        hasDiscount: false,
        minAge: 0,
        size: "select a size"
    })

    const submitFilter = (e) => {
        e.preventDefault()
        console.log("register: ", filter)
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
    
    console.log(filter)
    return(
        <>
            {renderDropDown &&
                <form onSubmit={submitFilter}>
                    <div>
                        <label htmlFor="name">Search a product:</label>
                        <input type="text" id="name" name="name" onChange={inputHandle}/>
                    </div>
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
                        <label htmlFor="size">size:</label>
                        <select name="size" id="size" onChange={inputHandle}>
                            <option value="select a size">select a size</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="big">big</option>
                        </select>
                    </div>
                    <input type="submit" value="Register"/>
                </form>
            }
            <button onClick={() => {setRenderDropDown(!renderDropDown)}}>
                {renderDropDown ? "View less filters" : "View more filters"}
            </button>
        </>
    )
}

export default Filter