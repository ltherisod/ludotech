import { useDirectionsForm } from "../hooks/usersHooks"
import React from "react"
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native"
const DirectionsForm = ({ submitCallback, initialValues, buttonText }) => {
  const formik = useDirectionsForm(submitCallback, initialValues)
  return (
      <View style={{ width:'100%',  alignItems:"center", }}>
          <View>
            <TextInput
              name="alias"
              value={formik.values.alias}
              onChangeText={formik.handleChange("alias")}
              onBlur={formik.handleBlur("alias")}
              placeholder="Alias"
              style={styles.inputText}
            />
            {formik.touched.alias && formik.errors.alias ? (
              <Text style={{ color: "red" }}>{formik.errors.alias}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="receiver"
              value={formik.values.receiver}
              onChangeText={formik.handleChange("receiver")}
              onBlur={formik.handleBlur("receiver")}
              placeholder="Receiver"
              style={styles.inputText}
            />
            {formik.touched.receiver && formik.errors.receiver ? (
              <Text style={{ color: "red" }}>{formik.errors.receiver}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="street"
              value={formik.values.street}
              onChangeText={formik.handleChange("street")}
              onBlur={formik.handleBlur("street")}
              placeholder="Street"
              style={styles.inputText}
            />
            {formik.touched.street && formik.errors.street ? (
              <Text style={{ color: "red" }}>{formik.errors.street}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="number"
              value={formik.values.number}
              onChangeText={formik.handleChange("number")}
              onBlur={formik.handleBlur("number")}
              placeholder="Number"
              style={styles.inputText}
            />
            {formik.touched.number && formik.errors.number ? (
              <Text style={{ color: "red" }}>{formik.errors.number}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="department"
              value={formik.values.department}
              onChangeText={formik.handleChange("department")}
              onBlur={formik.handleBlur("department")}
              placeholder="Department"
              style={styles.inputText}
            />
            {formik.touched.department && formik.errors.department ? (
              <Text style={{ color: "red" }}>{formik.errors.department}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="zipCode"
              value={formik.values.zipCode}
              onChangeText={formik.handleChange("zipCode")}
              onBlur={formik.handleBlur("zipCode")}
              placeholder="Zip Code"
              style={styles.inputText}
            />
            {formik.touched.zipCode && formik.errors.zipCode ? (
              <Text style={{ color: "red" }}>{formik.errors.zipCode}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="city"
              value={formik.values.city}
              onChangeText={formik.handleChange("city")}
              onBlur={formik.handleBlur("city")}
              placeholder="City"
              style={styles.inputText}
            />
            {formik.touched.city && formik.errors.city ? (
              <Text style={{ color: "red" }}>{formik.errors.city}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <TextInput
              name="state"
              value={formik.values.state}
              onChangeText={formik.handleChange("state")}
              onBlur={formik.handleBlur("state")}
              placeholder="State"
              style={styles.inputText}
            />
            {formik.touched.state && formik.errors.state ? (
              <Text style={{ color: "red" }}>{formik.errors.state}</Text>
            ) : (
              <Text style={{ color: "transparent" }}>NoErrors</Text>
            )}
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={formik.handleSubmit}>
                <ImageBackground style={{width:30, padding:3, marginVertical:10}} source={{ uri: "https://i.postimg.cc/256ZjvPG/back-Button.png",}} imageStyle={{ borderRadius: 5 }}>
                    <Text style={{color:"white",fontFamily:'Poppins_600SemiBold', alignSelf:"center", letterSpacing:1 }}>
                      {buttonText}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
            </View>
           
    </View>
      </View>
    
  )
}

const styles = StyleSheet.create({
  inputText: {
    width: 250,
    borderColor: "lightgray",
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
 
})

export default DirectionsForm
