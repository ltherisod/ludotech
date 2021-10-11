import React,{ useState } from "react"
import { TouchableOpacity, View, Text } from "react-native"
import { useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import DirectionsForm from "./DirectionsForm"

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
    console.log(res)
  }

  return (
    <View>
      {loading ? (
        <Text>LOADING </Text>
      ) : (
        <View>
          {!edit && (
            <View>
              <Text>Alias : {direction.alias}</Text>
              <Text>Receiver : {direction.receiver}</Text>
              <Text>Street : {direction.street}</Text>
              <Text>Number : {direction.number}</Text>
              <Text>Department : {direction.department}</Text>
              <Text>Zip Code : {direction.zipCode}</Text>
              <Text>City : {direction.city}</Text>
              <Text>State : {direction.state}</Text>
            </View>
          )}
          {edit && (
            <View>
              <DirectionsForm
                submitCallback={updateDirectionHandler}
                initialValues={initialValues}
                buttonText="Confirm"
              />
              <TouchableOpacity  onPress={() => setEdit(!edit)}>
               <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity  onPress={() => setEdit(!edit)}>
            <Text>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity  onClick={() => deleteAddress(direction._id)}>
            <Text>Delete Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Address
