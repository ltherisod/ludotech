import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import HeroPages from '../components/HeroPages'
import { connect } from 'react-redux'
import usersActions from "../redux/actions/usersActions"

const PurchasesScreen = (props) => {

  const [purchases, setPurchases] = useState([])
  const [searched, setSearched] = useState([])

  useEffect(() => {
    async function getPurchases() {
      try {
        let response = await props.getPurchases(props.user._id)
        setPurchases(response)
        setSearched(response)
      } catch (e) {
        console.log(e)
      }
    }
    getPurchases()
    // eslint-disable-next-line
   }, [])

   console.log(props.user._id)
   console.log(searched)
  //  console.log(purchases)

  return (
    <ScrollView>
      <ImageBackground
        style={{ width: "100%", minHeight: 400 }}
        source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }}
      >
        <HeroPages />
        <Text style={styles.profileTittle}>Profile</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        ></View>
      </ImageBackground>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

const mapDispatchToProps = {
  getPurchases: usersActions.getPurchaseByUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesScreen)

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})


// <ScrollView>
//       <ImageBackground
//         style={{ width: "100%", minHeight: 400 }}
//         source={{ uri: "https://i.postimg.cc/0Q7FDTVz/fondoconfeti.png" }}
//       >
//         <HeroPages />
//         <Text style={styles.profileTittle}>Profile</Text>
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             marginVertical: 15,
//           }}
//         ></View>
//       </ImageBackground>
//     </ScrollView>
//   )
