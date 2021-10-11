import { useDirectionsForm } from "../hooks/usersHooks"
import React from "react"
import { Text, View, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native"
const DirectionsForm = ({ submitCallback, initialValues, buttonText }) => {
   const formik = useDirectionsForm(submitCallback, initialValues)
   return (
      <View>
         <TextInput
            name="alias"
            value={formik.values.alias}
            onChange={formik.handleChange("alias")}
            onBlur={formik.handleBlur("alias")}
            placeholder="Alias"
            style={styles.inputText}
         />
         {formik.touched.alias && formik.errors.alias ? (
            <Text>{formik.errors.alias}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="receiver"
            value={formik.values.receiver}
            onChange={formik.handleChange("receiver")}
            onBlur={formik.handleBlur("receiver")}
            placeholder="Receiver"
            style={styles.inputText}
         />
         {formik.touched.receiver && formik.errors.receiver ? (
            <Text>{formik.errors.receiver}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange("street")}
            onBlur={formik.handleBlur("street")}
            placeholder="Street"
            style={styles.inputText}
         />
         {formik.touched.street && formik.errors.street ? (
            <Text>{formik.errors.street}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange("number")}
            onBlur={formik.handleBlur("number")}
            placeholder="Number"
            style={styles.inputText}
         />
         {formik.touched.number && formik.errors.number ? (
            <Text>{formik.errors.number}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange("department")}
            onBlur={formik.handleBlur("department")}
            placeholder="Department"
            style={styles.inputText}
         />
         {formik.touched.department && formik.errors.department ? (
            <Text>{formik.errors.department}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange("zipCode")}
            onBlur={formik.handleBlur("zipCode")}
            placeholder="Zip Code"
            style={styles.inputText}
         />
         {formik.touched.zipCode && formik.errors.zipCode ? (
            <Text>{formik.errors.zipCode}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange("city")}
            onBlur={formik.handleBlur("city")}
            placeholder="City"
            style={styles.inputText}
         />
         {formik.touched.city && formik.errors.city ? (
            <Text>{formik.errors.city}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TextInput
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange("state")}
            onBlur={formik.handleBlur("state")}
            placeholder="State"
            style={styles.inputText}
         />
         {formik.touched.state && formik.errors.state ? (
            <Text>{formik.errors.state}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TouchableOpacity onPress={formik.handleSubmit}>
            <ImageBackground style={styles.userButtonCheck} source={{ uri: "https://i.postimg.cc/mD7r09R8/button-Back.png" }} imageStyle={{borderRadius:5}}>
               <Text style={{color:"white", fontFamily: 'Poppins_800ExtraBold', fontSize:15}}>{buttonText}</Text>
            </ImageBackground>
        </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   inputText:{
      width: 250,
      borderColor: "lightgray",
      marginTop: 10,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical:5,
      borderRadius: 5,
      backgroundColor: "white",
   },
   userButtonCheck:{
      marginTop:10,
      marginLeft:-40,
      alignItems:"center",
      alignSelf: "center",
      paddingVertical: 8,
      paddingHorizontal: 11,
      width: 90,
  },
})

export default DirectionsForm