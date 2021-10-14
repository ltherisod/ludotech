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
                <View style={styles.backButtonContainer} >
                    <TouchableOpacity>
                        <View style={styles.backButton}>
                            <Text
                                style={styles.backButtonText}
                                onPress={() => {
                                props.navigation.navigate("HomeStack");
                                }}
                            >
                                Go back home
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
        <Text style={styles.articlesTittle}>Art</Text>
        <Text style={styles.articlesTittleIn}>i</Text>
        <Text style={styles.articlesTittle}>cles</Text>
        </View>
                
                <View style={styles.articlesMain}>

                    <Filter
                        filterArticles={(e) => filterArticles(e)}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> 
                    <View>
                    {articles.articles.map((article) => {
                        return (
                            <TouchableOpacity key={article._id} onPress={() => props.navigation.navigate('ArticleStack', { id: article._id })}>
                                <Article
                                    history={props.history}
                                    article={article}
                                    key={article._id}
                                    navigation={props.navigation}
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

    articlesTittle:{
        color:"white",
        fontFamily:"Poppins_700Bold",
        fontSize:45,
        textAlign:"center",
        marginTop:-35,
    },
    articlesTittleIn:{
        color: "#67f2cb",
        fontFamily:"Poppins_700Bold",
        fontSize:45,
        textAlign:"center",
        marginTop:-35,
    },
    backButtonContainer: {
        width: '100%',
        marginBottom: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundColor: "white",
        borderRadius: 80,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginVertical: 10,
    },
    backButtonText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16, 
        color: '#660099'
    }
})