import { useState } from "react"
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
    <div>
      {loading ? (
        <h1>LOADING PADREE!!!</h1>
      ) : (
        <div>
          {!edit && (
            <div>
              <p>Alias : {direction.alias}</p>
              <p>Receiver : {direction.receiver}</p>
              <p>Street : {direction.street}</p>
              <p>Number : {direction.number}</p>
              <p>Department : {direction.department}</p>
              <p>Zip Code : {direction.zipCode}</p>
              <p>City : {direction.city}</p>
              <p>State : {direction.state}</p>
            </div>
          )}
          {edit && (
            <div>
              <DirectionsForm
                submitCallback={updateDirectionHandler}
                initialValues={initialValues}
                buttonText="Confirm"
              />
              <button type="button" onClick={() => setEdit(!edit)}>
                Cancel
              </button>
            </div>
          )}
          <button type="button" onClick={() => setEdit(!edit)}>
            Edit Address
          </button>
          <button type="button" onClick={() => deleteAddress(direction._id)}>
            Delete Address
          </button>
        </div>
      )}
    </div>
  )
}

export default Address
