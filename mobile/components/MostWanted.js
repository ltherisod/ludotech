import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {useEffect, useState} from 'react'
import { connect } from "react-redux"
import articlesActions from "../redux/actions/articlesActions";

const MostWanted = (props) => {
    const [mostVisitArticles, setMostVisitArticles] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        props.getMostVisitArticles()
        .then(res => {
            setMostVisitArticles(res.response)
            setLoading(false)
        })
        .catch(e => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    /* <View>
      <Text style={styles.mainText}>Most wanted products</Text>
      <View>
      <ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card2.png" }}>
        <ImageBackground style={styles.gameImg} source={{ uri: mostVisitArticles[0].photos[0] }}></ImageBackground>
        <Text style={styles.gameName}>{mostVisitArticles[0].name}</Text>
      </ImageBackground>
      </View>
      <View>
      <ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card1.png" }}>
        <ImageBackground style={styles.gameImg} source={{ uri: mostVisitArticles[1].photos[0] }}></ImageBackground>
        <Text style={styles.gameName}>{mostVisitArticles[1].name}</Text>
      </ImageBackground>
      </View>
      <View>
      <ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card2.png" }}>
        <ImageBackground style={styles.gameImg} source={{ uri: mostVisitArticles[2].photos[0]}}></ImageBackground>
        <Text style={styles.gameName}>{mostVisitArticles[2].name}</Text>
      </ImageBackground>
      </View>
    </View> */

<View>
<Text style={styles.mainText}>Most wanted products</Text>
<View>
<ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card2.png" }}>
  <ImageBackground style={styles.gameImg} source={{ uri: "https://i.postimg.cc/yNH9CpQ5/King-Of-Tokyo2016-caja-web.png", }}></ImageBackground>
  <Text style={styles.gameName}>King of Tokio</Text>
</ImageBackground>
</View>
<View>
<ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card1.png" }}>
  <ImageBackground style={styles.gameImg} source={{ uri: "https://i.postimg.cc/RZsQ5xJ0/pandemic-Cthulhu.png", }}></ImageBackground>
  <Text style={styles.gameName}>Pandemic Cthulhu</Text>
</ImageBackground>
</View>
<View>
<ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card2.png" }}>
  <ImageBackground style={styles.gameImg} source={{ uri: "https://i.postimg.cc/fT9jtmhZ/exploding-Kittens-Icon.png", }}></ImageBackground>
  <Text style={styles.gameName}>Exploding Kittens</Text>
</ImageBackground>
</View>
</View>
  );
};

const mapDispatchToProps = {
  getMostVisitArticles: articlesActions.getMostVisitArticles,
}

export default connect(null, mapDispatchToProps)(MostWanted)

const styles = StyleSheet.create({
  mainText: {
    color: "white",
    fontSize: 18,
    paddingTop: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins_700Bold'
  },
  cardImg: {
    width: 300,
    height: 300,
  },
  gameImg: {
    width: 275,
    height: 275,
    alignSelf: 'center',
  },
  gameName: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'relative',
      bottom: 43,
      fontFamily: 'Poppins_700Bold'
  }
});
