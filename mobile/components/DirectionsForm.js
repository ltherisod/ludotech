import { useDirectionsForm } from "../hooks/usersHooks"
import React from "react"
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native"
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
         />
         {formik.touched.state && formik.errors.state ? (
            <Text>{formik.errors.state}</Text>
         ) : (
            <Text style={{color:"transparent"}}>NoErrors</Text>
         )}
         <TouchableOpacity onPress={formik.handleSubmit}>
             <Text>{buttonText}</Text>
        </TouchableOpacity>
      </View>
   )
}

export default DirectionsForm