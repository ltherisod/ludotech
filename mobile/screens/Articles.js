import React, { useState } from "react"
import {View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Article from "../components/Article"
import Filter from "../components/Filter"

const Articles = (props) => {
    const [articles, setArticles] = useState({
        articles: [],
        page: 1,
        totalCounts: null,
        totalPages: null,
    })
    const [currentPage, setCurrentPage] = useState(2)
    const filterArticles = (e) => {
        console.log(e)
        setArticles(e)
    }
    console.log(articles)
    
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <Header/>
                <View style={styles.articlesMain}>
                    <Text>Articles</Text>
                    <Filter
                        filterArticles={(e) => filterArticles(e)}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <View>
                    {/* {articles.articles.map((article) => {
                        return (
                            <Article
                                history={props.history}
                                article={article}
                                key={article._id}
                            />
                        )
                    })} */}
                    </View>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Articles

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    articlesMain: {
        minHeight: height-StatusBar.currentHeight,
    },
})