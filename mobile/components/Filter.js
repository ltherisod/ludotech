import React, { useState, useEffect } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, ImageBackground} from "react-native"
import { useArticles, useFilters, useUtils } from "../hooks/articlesHooks"
import { Switch } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome"

const Filter = (props) => {
    const [{ brands, genres, gameTypes }] = useUtils()
    const [submit, setSubmit] = useState(false)
    const [renderAllFilters, setRenderAllFilters] = useState(false)
    const [renderBrandName, setRenderBrandName] = useState("Brand")
    const [renderGenreName, setRenderGenreName] = useState("Genre")
    const [renderGameTypeName, setRenderGameTypeName] = useState("Game Type")
    const [prefilter, setPrefilter] = useState({})
    const [preFilterBrand, setPrefilterBrand] = useState("")
    const [preFilterGenre, setPrefilterGenre] = useState("")
    const [preFilterGameType, setPrefilterGameType] = useState("")
    const [renderDiscountModal, setRenderDiscountModal] = useState(false)
    const {
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
    } = useFilters()

    const [articles, loading] = useArticles(
       filters,
       submit,
       props.currentPage
    )
   
    useEffect(() => {
        props.setLoadingArticles?.(loading)
    }, [loading])
  
     useEffect(() => {
        props.filterArticles(articles)
    }, [articles])
  
    const submitFilters = (e) => {
        e.preventDefault()
        props.setCurrentPage(1)
        setSubmit(!submit)
    }

    const changeAllFilters = (e) => {
        setRenderAllFilters(!renderAllFilters)
        submitFilters(e)
    }

    const openFilter = () => {
        setRenderAllFilters(!renderAllFilters)
        setPrefilter({...filters})
        setPrefilterBrand(renderBrandName)
        setPrefilterGenre(renderGenreName)
        setPrefilterGameType(renderGameTypeName)
    }

    const closeFilters = () => {
        setRenderAllFilters(!renderAllFilters)
        setFilters({...prefilter})
        setRenderBrandName(preFilterBrand)
        setRenderGenreName(preFilterGenre)
        setRenderGameTypeName(preFilterGameType)
    }

    const resetFilters = (e) => {
        setFilters({})
        setRenderBrandName("Brand")
        setRenderGenreName("Genre")
        setRenderGameTypeName("Game Type")
        submitFilters(e)
    }

    const pricesToRender = [
        {title: "Price", value: "all"},
        {title: "$0 - $10", value: "0-10"},
        {title: "$11 - $20", value: "11-20"},
        {title: "$21 - $40", value: "21-40"},
        {title: "$41 - $60", value: "41-60"},
        {title: "$61 - $80", value: "61-80"},
        {title: "$81 - $100", value: "81-100"},
        {title: "$101 - $120", value: "101-120"},
        {title: "$121 or more", value: "121orMore"},
    ]

    const minAgeToRender = [
        {title: "Min age", value: "all"},
        {title: "3", value: "three"},
        {title: "6", value: "six"},
        {title: "9", value: "nine"},
        {title: "12", value: "twelve"},
        {title: "16 or more", value: "sexteenOrMore"},
    ]

    const playersToRender = [
        {title: "Players", value: "all"},
        {title: "one", value: "one"},
        {title: "2 - 4", value: "2-4"},
        {title: "5 - 8", value: "5-8"},
        {title: "9 or more", value: "nineOrMore"},
    ]

    const sizeToRender = [
        {title: "Size", value: ""},
        {title: "Small", value: "Small"},
        {title: "Medium", value: "Medium"},
        {title: "Large", value: "Large"},
    ]

    const brandsPlus = [
        {name: "Brand", _id: ""},
        ...brands
    ]

    const genresPlus = [
        {name: "Genre", _id: ""},
        ...genres
    ]

    const gameTypePlus = [
        {name: "Game type", _id: ""},
        ...gameTypes
    ]

    const changeDiscount = (newValue) => {
        setRenderDiscountModal(!renderDiscountModal)
        inputBoolean(newValue)
    }

    return(
        <View style={styles.filterUltracontainer}>
            <View style={styles.filterBoxContainer}>
                <TextInput placeholder="Search a product" defaultValue={filters.name === undefined ? "" : filters.name} style={styles.search} onChangeText={(e) => {inputHandle(e)}}/>
                    <Modal animationType="slide" transparent={true} visible={renderAllFilters} onRequestClose={() => {setRenderAllFilters(!renderAllFilters)}}>
                        <View style={styles.principalInternalModal}>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={pricesToRender}
                                    defaultButtonText={filters.minPrice === undefined ? "Price" : filters.maxPrice === undefined ? "$121 or more" : `$${filters.minPrice} - $${filters.maxPrice}`}
                                    onSelect={priceObject => {
                                        inputPrice(priceObject.value)                                
                                    }}
                                    buttonTextAfterSelection={priceObject => {
                                        return priceObject.title
                                    }}
                                    rowTextForSelection={priceObject => {
                                        return priceObject.title
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={minAgeToRender}
                                    defaultButtonText={filters.minAge === undefined ? "Min Age" : filters.minAge === 16 ? "16 or more" : filters.minAge}
                                    onSelect={minAgeObject => {         
                                        inputMinAge(minAgeObject.value)
                                    }}
                                    buttonTextAfterSelection={minAgeObject => {
                                        return minAgeObject.title
                                    }}
                                    rowTextForSelection={minAgeObject => {
                                        return minAgeObject.title
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={playersToRender}
                                    defaultButtonText={filters.minPlayers === undefined ? "Players" : filters.minPlayers === 1 ? "one" : filters.minPlayers === 9 ? "9 or more" : `${filters.minPlayers} - ${filters.maxPlayers}`}
                                    onSelect={playersObject => {
                                        inputPlayers(playersObject.value)                                
                                    }}
                                    buttonTextAfterSelection={playersObject => {
                                        return playersObject.title
                                    }}
                                    rowTextForSelection={playersObject => {
                                        return playersObject.title
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={sizeToRender}
                                    defaultButtonText={filters.size === undefined ? "Size" : filters.size}
                                    onSelect={sizeObject => {
                                        inputSize(sizeObject.value)                                
                                    }}
                                    buttonTextAfterSelection={sizeObject => {
                                        return sizeObject.title
                                    }}
                                    rowTextForSelection={sizeObject => {
                                        return sizeObject.title
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={brandsPlus}
                                    defaultButtonText={renderBrandName}
                                    onSelect={brandObject => {
                                        setRenderBrandName(brandObject.name)
                                        inputBrand(brandObject._id)                                
                                    }}
                                    buttonTextAfterSelection={brandObject => {
                                        return brandObject.name
                                    }}
                                    rowTextForSelection={brandObject => {
                                        return brandObject.name
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={genresPlus}
                                    defaultButtonText={renderGenreName}
                                    onSelect={genreObject => {
                                        setRenderGenreName(genreObject.name)
                                        inputGenre(genreObject._id)                                
                                    }}
                                    buttonTextAfterSelection={genreObject => {
                                        return genreObject.name
                                    }}
                                    rowTextForSelection={genreObject => {
                                        return genreObject.name
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView}>
                                <SelectDropdown
                                    data={gameTypePlus}
                                    defaultButtonText={renderGameTypeName}
                                    onSelect={gameTypeObject => {
                                        setRenderGameTypeName(gameTypeObject.name)
                                        inputGameType(gameTypeObject._id)                                
                                    }}
                                    buttonTextAfterSelection={gameTypeObject => {
                                        return gameTypeObject.name
                                    }}
                                    rowTextForSelection={gameTypeObject => {
                                        return gameTypeObject.name
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle} 
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={() => {
                                        return (
                                          <FontAwesome name="chevron-down" color={"gray"} size={15} />
                                        )
                                      }}
                                      dropdownIconPosition={"right"}
                                />
                            </View>
                            <View style={styles.centeredView2}>
                               <Text style={{fontFamily: "Poppins_500Medium", letterSpacing:.5}}>With Discount </Text>
                               <Switch value={filters.hasDiscount === undefined ? false : true} onValueChange={changeDiscount} />
                            </View>
                            <View style={styles.filterButtons}>
                                <Pressable style={[styles.button, styles.buttonClose]} onPress={(e) => {changeAllFilters(e)}}>
                                    <Text style={styles.textStyle}>Filter</Text>
                                </Pressable>
                                <Pressable style={[styles.button, styles.buttonClose1]} onPress={() => {closeFilters()}}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                <TouchableOpacity onPress={(e) => {submitFilters(e)}}>
                    <ImageBackground
                        style={styles.filterButton1}
                        source={{ uri: "https://i.postimg.cc/mD7r09R8/button-Back.png" }}
                        imageStyle={{ borderRadius: 5 }}
                    >
                        <Text style={styles.filterButtonText}>Filter</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {openFilter()}}>
                    <ImageBackground
                        style={styles.filterButton2}
                        source={{ uri: "https://i.postimg.cc/5tbgdDLK/back-Button.png" }}
                        imageStyle={{ borderRadius: 5 }}
                    >
                        <Text style={styles.filterButtonText}> + Filters</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => {resetFilters(e)}}>
                    <ImageBackground
                        style={styles.filterButton2}
                        source={{ uri: "https://i.postimg.cc/KcfDB9Xt/back-Button2.png" }}
                        imageStyle={{ borderRadius: 5 }}
                    >
                        <Text style={styles.filterButtonText}> Reset</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>       
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    filterUltracontainer: {

    },
    filterBoxContainer: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    search: {
        width: 250,
        borderColor: "lightgray",
        marginBottom: 2,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "white",
        alignSelf:"center",
    },
    filtersBox: {

    },
    principalInternalModal: {
        width:'80%',
        minHeight: 500,
        backgroundColor: "white",
        position:"relative",
        top:100,
        left:40,
        borderRadius:20,
        padding:20,
        shadowColor: "#000",
        alignItems:'center',
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 6.00,
        elevation: 24,
    },
    filterButtons: {
        alignSelf:"center",
        flexDirection: "row",
    },
    centeredView: {
        marginVertical:5,
    },
    centeredView2: {
        marginVertical:5,
        flexDirection:'row',
        alignItems:'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonPink: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginVertical:5,
    },
    buttonOpen: {
        backgroundColor: "#e561ae",
    },
    buttonClose: {
        backgroundColor: "#7c51b0",
    },
    buttonClose1: {
        backgroundColor: "#c3286c",
    },

    textStyle: {
        color: "white",
        fontFamily: "Poppins_700Bold",
        textAlign: "center",
        letterSpacing:1,
    },
    filterButton1: {
        alignSelf: "center",
        paddingVertical: 7,
        paddingHorizontal: 10,
        width: 70,
        marginLeft:5
    },
    filterButtonText: {
        color: "white",
        textAlign: "center",
        fontFamily: "Poppins_700Bold",
      },  
      filterButton2: {
        alignSelf: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 80,
        margin:5
      }, 
      buttonAnswer:{
        backgroundColor:"#67f2cb", 
        paddingVertical:7, 
        paddingHorizontal:15, 
        borderRadius:5,
      },
      buttonAnswerText:{
        color:"white",
        fontWeight:"bold",
        textTransform:"capitalize"
      },
      button:{
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginVertical:5,
        marginHorizontal:10,
      },
      modalView2: {
        width:300, 
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position:"relative",
        top:70,
        left:27
    },
    dropdown1BtnStyle:{
        height: 40,
        width: 260,
        padding: 10,
        borderRadius: 2,
        borderColor: "#dad8d8",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor:'whitesmoke'
    },
    dropdown1BtnTxtStyle:{
        fontFamily: "Poppins_500Medium",
        letterSpacing:.5,
        
    }
})