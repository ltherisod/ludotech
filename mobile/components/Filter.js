import React, { useState, useEffect } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { connect } from "react-redux"
import articlesUtilitiesActions from "../redux/actions/articlesUtilitiesActions"
import { useArticles, useFilters, useUtils } from "../hooks/articlesHooks"

const Filter = (props) => {
    const [{ brands, genres, gameTypes }, loadingUtils, erroUtils] = useUtils()
    const [submit, setSubmit] = useState(false)
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

    // const checkboxHandler = (newValue) => {
    //     setToggleCheckBox(newValue)
    //     inputBoolean(newValue)
    // }

    const submitFilters = (e) => {
        e.preventDefault()
        props.setCurrentPage(1)
        setSubmit(!submit)
    }

    return(
        <View style={styles.filterUltracontainer}>
            <View style={styles.filterBoxContainer}>
                <TextInput placeholder="Search a product" style={styles.search} onChangeText={(e) => {inputHandle(e)}}/>
                <View style={styles.filtersBox}>

                </View>
                <View style={styles.filterDiscount}>
                    <Text>With discount</Text>
                    {/* <CheckBox
                        value={toggleCheckBox}
                        onValueChange={(newValue) => checkboxHandler(newValue)}
                    /> */}
                </View>
                <TouchableOpacity onPress={(e) => {submitFilters(e)}}><Text>Filter</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const mapDispatchToProps = {
    getAllArticlesUtilities: articlesUtilitiesActions.getAllArticlesUtilities,
}

export default connect(null, mapDispatchToProps)(Filter)

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
})