import React, { useState } from "react"
import {View, Text, ScrollView, Platform, StatusBar, StyleSheet, Dimensions, ImageBackground, TouchableOpacity} from "react-native"
import Footer from "../components/Footer"
import Article from "../components/Article"
import Filter from "../components/Filter"
import HeroPages from "../components/HeroPages"

const Articles = (props) => {

    const [articles, setArticles] = useState({
        articles: [],
        page: 1,
        totalCounts: null,
        totalPages: 1,
    })

    const [currentPage, setCurrentPage] = useState(1)

    const filterArticles = (e) => {
        setArticles(e)
    }
    
    return (
        <ScrollView>
            <ImageBackground style={{width:"100%"}} source={require("../assets/fondoVioleta.png")} resizeMode="cover">
                <HeroPages/>
                <View style={styles.articlesMain}>
                    <Text style={styles.articlesTitle}>Articles</Text>
                    <Filter
                        filterArticles={(e) => filterArticles(e)}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> 
                    <View>
                    {articles.articles.map((article) => {
                        return (
                            <TouchableOpacity onPress={() => props.navigation.navigate('ArticleStack', { id: article._id })}>
                                <Article
                                    history={props.history}
                                    article={article}
                                    key={article._id}
                                    />
                            </TouchableOpacity>
                        )
                    })}
                    </View>
                </View>
                <Footer/>
            </ImageBackground>
        </ScrollView>
    )
}

export default Articles

const styles = StyleSheet.create({
    articlesMain: {
       minHeight:130
    },

    articlesTitle:{
        color:"white",
        fontFamily:"Poppins_700Bold",
        fontSize:25,
        textAlign:"center",
    }
})