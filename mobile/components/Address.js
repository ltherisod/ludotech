import React,{ useState } from "react"
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground } from "react-native"
import { useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import DirectionsForm from "./DirectionsForm"
import Preloader from "../components/Preloader"

const Address = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [edit, setEdit] = useState(false)
  const { direction } = props

  const updateDirectionHandler = async (values) => {
    setLoading(true)
    const res = await dispatch(
      usersActions.updateDirection(values, direction?._id)
    )
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  const initialValues = {
    alias: direction?.alias,
    receiver: direction?.receiver,
    street: direction?.street,
    number: direction?.number,
    department: direction?.department,
    zipCode: direction?.zipCode,
    city: direction?.city,
    state: direction?.state,
  }

  const deleteAddress = async (id) => {
    const res = await dispatch(usersActions.deleteDirection(id))
  }

  return (
    <View style={styles.addressCard}>
      {loading ? (
        <Preloader/>
      ) : (
        <View>
          {!edit && (
            <View style={styles.addressCardData}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.addressText1}>Alias :</Text>
                <Text style={styles.addressText}> {direction.alias}</Text>
              </View>
             <View style={{flexDirection:'row'}} >
                <Text style={styles.addressText1}>Receiver :</Text>
                <Text style={styles.addressText}> {direction.receiver}</Text>
             </View>
             <View style={{flexDirection:'row'}}>
                <Text style={styles.addressText1}>Street : </Text>
                <Text style={styles.addressText}>{direction.street}</Text>
             </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.addressText1}>Number : </Text>
                <Text style={styles.addressText}>{direction.number}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.addressText1}>Department :</Text>
                <Text style={styles.addressText}> {direction.department}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.addressText1}>Zip Code : </Text>
                <Text style={styles.addressText}>{direction.zipCode}</Text>
              </View>
              <View style={{flexDirection:'row'}} >
                <Text style={styles.addressText1}>City : </Text>
                <Text style={styles.addressText}>{direction.city}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.addressText1}>State : </Text>
                <Text style={styles.addressText}>{direction.state}</Text>
              </View>
            </View>
          )}
          {edit && (
            <View style={{marginBottom:20}}>
              <DirectionsForm
                submitCallback={updateDirectionHandler}
                initialValues={initialValues}
                buttonText="Edit"
              />
              <View>
                <TouchableOpacity  onPress={() => setEdit(!edit)} style={{alignSelf:'center', marginTop:5}}>
                <ImageBackground style={{width:125, padding:8}} source={{ uri: "https://i.postimg.cc/L6km2Sc6/back-Google.png",}} imageStyle={{ borderRadius: 5 }}>
                    <Text style={{color:"white",fontFamily:'Poppins_700Bold', alignSelf:"center", fontSize:15}}>Cancel</Text>
                </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{flexDirection:'row', justifyContent:"space-around"}}>
              <TouchableOpacity  onPress={() => setEdit(!edit)}>
                  <ImageBackground style={{width:65, padding:5, marginHorizontal:10}} source={{ uri: "https://i.postimg.cc/256ZjvPG/back-Button.png",}} imageStyle={{ borderRadius: 5 }}>
                <Text style={{color:"white",fontFamily:'Poppins_600SemiBold', alignSelf:"center", letterSpacing:1 }}>Edit</Text>
                    </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => deleteAddress(direction._id)}>
                  <ImageBackground style={{width:65, padding:5,marginHorizontal:10}} source={{ uri: "https://i.postimg.cc/L6km2Sc6/back-Google.png",}} imageStyle={{ borderRadius: 5 }}>
                      <Text style={{color:"white",fontFamily:'Poppins_600SemiBold', alignSelf:"center", letterSpacing:1 }}>Delete</Text>
                  </ImageBackground>
              </TouchableOpacity>
          </View>
          
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  addressCard:{
    width:"90%",
    backgroundColor:"white",
    minHeight: 130,
    borderRadius:10,
    padding:20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 6.00,
    elevation: 24,
    alignItems:"center",
    alignSelf:"center",
    marginVertical:15
  },
  addressText:{
    fontFamily:"Poppins_600SemiBold",
    color:"gray",
  },
  addressText1:{
    fontFamily:"Poppins_700Bold",
    color:"gray",
    marginLeft:-28
  },
  addressCardData:{

  }
})
export default Address
