import React, { useState, useEffect } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable} from "react-native"
import { useArticles, useFilters, useUtils } from "../hooks/articlesHooks"

const Filter = (props) => {
    const [{ brands, genres, gameTypes }] = useUtils()
    const [submit, setSubmit] = useState(false)
    const [renderAllFilters, setRenderAllFilters] = useState(false)
    const [renderPriceModal, setRenderPriceModal] = useState(false)
    const [renderMinAgeModal, setRenderMinAgeModal] = useState(false)
    const [renderPlayersModal, setRenderPlayersModal] = useState(false)
    const [renderSizeModal, setRenderSizeModal] = useState(false)
    const [renderBrandModal, setRenderBrandModal] = useState(false)
    const [renderGenreModal, setRenderGenreModal] = useState(false)
    const [renderGameTypeModal, setRenderGameTypeModal] = useState(false)

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
       inputGameType   
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

    const changePrice = (newValue) => {
        setRenderPriceModal(!renderPriceModal)
        inputPrice(newValue)
    }

    const changeMinAge = (newValue) => {
        setRenderMinAgeModal(!renderMinAgeModal)
        inputMinAge(newValue)
    }

    const changePlayers = (newValue) => {
        setRenderPlayersModal(!renderPlayersModal)
        inputPlayers(newValue)
    }

    const changeSize = (newValue) => {
        setRenderSizeModal(!renderSizeModal)
        inputSize(newValue)
    }

    const changeBrand = (newValue) => {
        setRenderBrandModal(!renderBrandModal)
        inputBrand(newValue)
    }

    const changeGenre = (newValue) => {
        setRenderGenreModal(!renderGenreModal)
        inputGenre(newValue)
    }

    const changeGameType = (newValue) => {
        setRenderGameTypeModal(!renderGameTypeModal)
        inputGameType(newValue)
    }

    const changeDiscount = (newValue) => {
        setRenderDiscountModal(!renderDiscountModal)
        inputBoolean(newValue)
    }

    const renderOptionsBrands = () => {
        return brands.map(brand => {
            return (
                <Pressable key={brand._id} style={[styles.button, styles.buttonClose]} onPress={() => {changeBrand(brand._id)}}>
                    <Text style={styles.textStyle}>{brand.name}</Text>
                </Pressable>
            )
        })
    }

    const renderOptionsGenres = () => {
        return genres.map(genre => {
            return (
                <Pressable key={genre._id} style={[styles.button, styles.buttonClose]} onPress={() => {changeGenre(genre._id)}}>
                    <Text style={styles.textStyle}>{genre.name}</Text>
                </Pressable>
            )
        })
    }

    const renderOptionsGameTypes = () => {
        return gameTypes.map(gameType => {
            return (
                <Pressable key={gameType._id} style={[styles.button, styles.buttonClose]} onPress={() => {changeGameType(gameType._id)}}>
                    <Text style={styles.textStyle}>{gameType.name}</Text>
                </Pressable>
            )
        })
    }

    return(
        <View style={styles.filterUltracontainer}>
            <View style={styles.filterBoxContainer}>
                <TextInput placeholder="Search a product" style={styles.search} onChangeText={(e) => {inputHandle(e)}}/>
                <View style={styles.principalModal}>
                    <Modal animationType="slide" transparent={true} visible={renderAllFilters} onRequestClose={() => {setRenderAllFilters(!renderAllFilters)}}>
                        <View style={styles.principalInternalModal}>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderPriceModal} onRequestClose={() => {setRenderPriceModal(!renderPriceModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("all")}}>
                                                <Text style={styles.textStyle}>All</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("0-10")}}>
                                                <Text style={styles.textStyle}>0 - $10</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("11-20")}}>
                                                <Text style={styles.textStyle}>$11 - $20</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("21-40")}}>
                                                <Text style={styles.textStyle}>$21 - $40</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("41-60")}}>
                                                <Text style={styles.textStyle}>$41 - $60</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("61-80")}}>
                                                <Text style={styles.textStyle}>$61 - $80</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("81-100")}}>
                                                <Text style={styles.textStyle}>$81 - $100</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("101-120")}}>
                                                <Text style={styles.textStyle}>$101 - $120</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePrice("121orMore")}}>
                                                <Text style={styles.textStyle}>$121 or more</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderPriceModal(!renderPriceModal)}}>
                                    <Text style={styles.textStyle}>Select price</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderMinAgeModal} onRequestClose={() => {setRenderMinAgeModal(!renderMinAgeModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeMinAge("all")}}>
                                                <Text style={styles.textStyle}>All</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeMinAge("three")}}>
                                                <Text style={styles.textStyle}>3</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeMinAge("six")}}>
                                                <Text style={styles.textStyle}>6</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeMinAge("nine")}}>
                                                <Text style={styles.textStyle}>9</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeMinAge("twelve")}}>
                                                <Text style={styles.textStyle}>12</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeMinAge("sexteenOrMore")}}>
                                                <Text style={styles.textStyle}>16 or more</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderMinAgeModal(!renderMinAgeModal)}}>
                                    <Text style={styles.textStyle}>Select min age</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderPlayersModal} onRequestClose={() => {setRenderPlayersModal(!renderPlayersModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePlayers("all")}}>
                                                <Text style={styles.textStyle}>All</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePlayers("one")}}>
                                                <Text style={styles.textStyle}>one</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePlayers("2-4")}}>
                                                <Text style={styles.textStyle}>2 - 4</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePlayers("5-8")}}>
                                                <Text style={styles.textStyle}>5 - 8</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changePlayers("nineOrMore")}}>
                                                <Text style={styles.textStyle}>9 or more</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderPlayersModal(!renderPlayersModal)}}>
                                    <Text style={styles.textStyle}>Select amount of players</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderSizeModal} onRequestClose={() => {setRenderSizeModal(!renderSizeModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeSize("")}}>
                                                <Text style={styles.textStyle}>all</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeSize("Small")}}>
                                                <Text style={styles.textStyle}>Small</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeSize("Medium")}}>
                                                <Text style={styles.textStyle}>Medium</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeSize("Large")}}>
                                                <Text style={styles.textStyle}>Large</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderSizeModal(!renderSizeModal)}}>
                                    <Text style={styles.textStyle}>Select size</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderBrandModal} onRequestClose={() => {setRenderBrandModal(!renderBrandModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeBrand("")}}>
                                                <Text style={styles.textStyle}>All</Text>
                                            </Pressable>
                                            {renderOptionsBrands()}
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderBrandModal(!renderBrandModal)}}>
                                    <Text style={styles.textStyle}>Select brand</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderGenreModal} onRequestClose={() => {setRenderGenreModal(!renderGenreModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeGenre("")}}>
                                                <Text style={styles.textStyle}>All</Text>
                                            </Pressable>
                                            {renderOptionsGenres()}
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderGenreModal(!renderGenreModal)}}>
                                    <Text style={styles.textStyle}>Select genre</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderGameTypeModal} onRequestClose={() => {setRenderGameTypeModal(!renderGameTypeModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeGameType("")}}>
                                                <Text style={styles.textStyle}>All</Text>
                                            </Pressable>
                                            {renderOptionsGameTypes()}
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderGameTypeModal(!renderGameTypeModal)}}>
                                    <Text style={styles.textStyle}>Select type of game</Text>
                                </Pressable>
                            </View>
                            <View style={styles.centeredView}>
                                <Modal animationType="slide" transparent={true} visible={renderDiscountModal} onRequestClose={() => {setRenderDiscountModal(!renderDiscountModal)}}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeDiscount(true)}}>
                                                <Text style={styles.textStyle}>yes</Text>
                                            </Pressable>
                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {changeDiscount(false)}}>
                                                <Text style={styles.textStyle}>no</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {setRenderDiscountModal(!renderDiscountModal)}}>
                                    <Text style={styles.textStyle}>With discount?</Text>
                                </Pressable>
                            </View>
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={(e) => {changeAllFilters(e)}}>
                                <Text style={styles.textStyle}>Filter</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity onPress={(e) => {submitFilters(e)}}><Text>Filter</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {setRenderAllFilters(!renderAllFilters)}}><Text>More filters</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    filterUltracontainer: {

    },
    filterBoxContainer: {

    },
    search: {

    },
    filtersBox: {

    },
    principalModal: {
        
    },
    principalInternalModal: {

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#e561ae",
    },
    buttonClose: {
        backgroundColor: "#7c51b0",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },    
})