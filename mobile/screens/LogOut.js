import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"

const LogOut = () => {
  const dispatch = useDispatch()
  return (
    <View style={{ alignContent: "center" }}>
      <Text>Log Out</Text>
      <Text>
        Este componente está para hacer test de login/signup... después vuela
      </Text>
      <TouchableOpacity
        style={{ width: "30%" }}
        onPress={() => dispatch(usersActions.logOut())}
      >
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "black",
            color: "white",
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogOut

const styles = StyleSheet.create({})
