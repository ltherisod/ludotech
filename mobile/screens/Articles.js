import React, { useState, useRef } from "react"
import {
   View,
   Text,
   ScrollView,
   Platform,
   StatusBar,
   StyleSheet,
   Dimensions,
   ImageBackground,
   TouchableOpacity,
} from "react-native"
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
   const scrollRef = useRef()

   const filterArticles = (e) => {
      setArticles(e)
   }

   return (
      <ScrollView ref={scrollRef}>
         <ImageBackground
            style={{ width: "100%" }}
            source={require("../assets/fondoVioleta.png")}
            resizeMode="cover"
         >
            <HeroPages />
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
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
                        <TouchableOpacity
                           key={article._id}
                           onPress={() =>
                              props.navigation.navigate("ArticleStack", {
                                 id: article._id,
                              })
                           }
                        >
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
               {articles?.totalPages > 1 && (
                  <View style={styles.paginationButtonContainer}>
                     {currentPage > 1 && (
                        <TouchableOpacity
                           style={styles.prevButton}
                           onPress={() => {
                              setCurrentPage(currentPage - 1)
                              scrollRef.current?.scrollTo({
                                 y: 0,
                                 animated: true,
                              })
                           }}
                        >
                           <Text style={styles.prevText}>Prev</Text>
                        </TouchableOpacity>
                     )}
                     <TouchableOpacity style={styles.numberPage}>
                        <Text style={styles.numberText}>
                           Current page: {currentPage}/{articles.totalPages}
                        </Text>
                     </TouchableOpacity>
                     {currentPage < articles.totalPages && (
                        <TouchableOpacity
                           style={styles.nextButton}
                           onPress={() => {
                              setCurrentPage(currentPage + 1)
                              scrollRef.current?.scrollTo({
                                 y: 0,
                                 animated: true,
                              })
                           }}
                        >
                           <Text style={styles.nextText}>Next</Text>
                        </TouchableOpacity>
                     )}
                  </View>
               )}
            </View>
            <View style={styles.backButtonContainer}>
               <TouchableOpacity>
                  <View style={styles.backButton}>
                     <Text
                        style={styles.backButtonText}
                        onPress={() => {
                           props.navigation.navigate("HomeStack")
                        }}
                     >
                        Go back home
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
            <Footer />
         </ImageBackground>
      </ScrollView>
   )
}

export default Articles

const styles = StyleSheet.create({
   articlesMain: {
      minHeight: 130,
   },

   articlesTittle: {
      color: "white",
      fontFamily: "Poppins_700Bold",
      fontSize: 45,
      textAlign: "center",
      marginTop: -35,
   },
   articlesTittleIn: {
      color: "#67f2cb",
      fontFamily: "Poppins_700Bold",
      fontSize: 45,
      textAlign: "center",
      marginTop: -35,
   },
   backButtonContainer: {
      marginTop:50,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
   },
   backButton: {
      justifyContent: "center",
      alignItems: "center",
      width: "70%",
      backgroundColor: "white",
      borderRadius: 80,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginVertical: 10,
   },
   backButtonText: {
      fontFamily: "Poppins_700Bold",
      fontSize: 16,
      color: "#660099",
   },
   paginationButtonContainer: {
      width: "100%",
      height: 40,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
   },
   prevButton: {
      height: 40,
      backgroundColor: "#e052c1",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 5,
   },
   prevText: {
      color: "white",
      fontFamily: "Poppins_700Bold",
      fontSize: 20,
   },
   numberPage: {},
   numberText: {
      color: "white",
      fontFamily: "Poppins_700Bold",
      fontSize: 18,
   },
   nextButton: {
      height: 40,
      backgroundColor: "#e052c1",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 5,
   },
   nextText: {
      color: "white",
      fontFamily: "Poppins_700Bold",
      fontSize: 20,
   },
})

/* 

{articles?.totalPages > 1 && (
                     <div style={{ display: "flex", gap: "1rem",alignItems: "center",}}>
                        {currentPage > 1 && (
                           <button className="profileButton" style={{ backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,}} type="button" onClick={() => {window.scrollBy({top: -document.getElementById("containerArticles").offsetHeight, behavior: "smooth",}) setCurrentPage(currentPage - 1)}}>Prev</button>)}
                        <p style={{margin: "0",fontSize: "1.2rem",color: "white",}}>
                           Current page: {currentPage}/{articles.totalPages}
                        </p>
                        {currentPage < articles.totalPages && (
                           <button className="profileButton" style={{backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,}} type="button" onClick={() => {window.scrollBy({top: -document.getElementById("containerArticles").clientHeight,left: 0, behavior: "smooth",}) setCurrentPage(currentPage + 1)}}>Next</button>)}
                     </div>
                  )}

*/
