import React, { useState, useEffect } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable} from "react-native"
import { useArticles, useFilters, useUtils } from "../hooks/articlesHooks"

const Filter = (props) => {
    const [{ brands, genres, gameTypes }, loadingUtils, erroUtils] = useUtils()
    const [submit, setSubmit] = useState(false)
    const [renderDiscountModal, setRenderDiscountModal] = useState(false)
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
    }, [loading])
  
     useEffect(() => {
        props.filterArticles(articles)
    }, [articles])
  
    // const renderOptions = (options) => {
    //     return options.map((option) => {
    //        return (
    //           <option key={option._id} value={option._id}>
    //              {option.name}
    //           </option>
    //        )
    //     })
    // }

    const changeDiscount = (newValue) => {
        setRenderDiscountModal(!renderDiscountModal)
        inputBoolean(newValue)
    }

    const submitFilters = (e) => {
        e.preventDefault()
        props.setCurrentPage(1)
        setSubmit(!submit)
    }
console.log(renderDiscountModal)
    return(
        <View style={styles.filterUltracontainer}>
            <View style={styles.filterBoxContainer}>
                <TextInput placeholder="Search a product" style={styles.search} onChangeText={(e) => {inputHandle(e)}}/>
                <View style={styles.filtersBox}>

                <View style={styles.filterDiscount}>
                    <Modal animationType="slide" transparent={true} visible={renderDiscountModal} onRequestClose={() => {setRenderDiscountModal(!renderDiscountModal)}}>
                        <Pressable style={styles.optionDiscount} onPress={() => {changeDiscount(true)}}>
                            <Text>yes</Text>
                        </Pressable>
                        <Pressable style={styles.optionDiscount} onPress={() => {changeDiscount(false)}}>
                            <Text>no</Text>
                        </Pressable>
                    </Modal>
                    <Pressable style={styles.buttonDiscount} onPress={() => {setRenderDiscountModal(!renderDiscountModal)}}>
                        <Text>With discount?</Text>
                    </Pressable>
                </View>
                </View>
                <TouchableOpacity onPress={(e) => {submitFilters(e)}}><Text>Filter</Text></TouchableOpacity>
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
    filterDiscount: {

    },
    filtersBox: {

    },
    buttonDiscount: {

    },
    optionDiscount: {

    },

})