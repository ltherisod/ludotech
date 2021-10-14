import React from "react";
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
  Image,
} from "react-native"
import Footer from "../components/Footer";
import MostWanted from "../components/MostWanted";
import NewArticlesCarousel from "../components/NewArticlesCarousel";


const Home = (props) => {
  return (
      <ScrollView>
        <View style={styles.homeMain}>
          <ImageBackground
            style={styles.mainImg}
            source={{ uri: "https://i.postimg.cc/4NwFMLWs/fondo-Violeta.png" }}
          >
            <ImageBackground
              style={styles.hero}
              source={{ uri: 'https://i.postimg.cc/ryNh0ZXx/hero.png' }}
            >
              <Image
                style={styles.rubik}
                source={require("../assets/rubik.png")}
              />
              
            </ImageBackground>
            <Image
                style={styles.logo}
                source={require("../assets/ludotechw.png")}
              />

            <Text style={styles.mainText}>
                Welcome to the land of the games
              </Text>
              <TouchableOpacity>
                <View style={styles.button}>
                  <Text
                    style={styles.buttonText}
                    onPress={() => {
                      props.navigation.navigate("Articles");
                    }}
                  >
                    Let´s go there
                  </Text>
                </View>
              </TouchableOpacity>
              <MostWanted navigation={props.navigation} />
              <NewArticlesCarousel navigation={props.navigation} />
              <Footer />

          </ImageBackground>
        </View>
      </ScrollView>
  );
};

export default Home;

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  homeMain: {
    minHeight: height - StatusBar.currentHeight,
  },
  mainImg: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  hero: {
    width: "100%",
    alignItems: "center",
    paddingTop: '10%'
  },
  logo: {
    maxHeight:200,
    marginTop: 5
  },
  rubik: {
    width: 300,
    height: 300,
  },
  mainText: {
    color: "white",
    fontSize: 25, 
    paddingVertical: 15,
    fontFamily: 'Poppins_800ExtraBold',
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  button: {
    backgroundColor: "white",
    borderRadius: 80,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16, 
    color: '#660099'
  }
});
