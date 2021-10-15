import usersActions from "../redux/actions/usersActions"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldValue, setFieldValue] = useState({ photo: null })
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => submitHandler(values),
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, "Firstname must have at least 2 characters")
        .required("Required"),
      lastname: Yup.string()
        .min(2, "Lastname must have at least 2 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(4, "Password must have at least 4 characters")
        .required("Required"),
    }),
  })
  const submitHandler = async (values) => {
    const filename = fieldValue.photo.uri.split("/").pop()
    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`
    const formData = new FormData()
    formData.append("firstname", values.firstname)
    formData.append("lastname", values.lastname)
    formData.append("email", values.email)
    formData.append("password", values.password)
    formData.append("photo", {
      uri: fieldValue.photo.uri,
      name: filename,
      type,
    })
    setLoading(true)
    const res = await dispatch(usersActions.logInOrSignUp(formData, "signup"))
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  const responseGoogle = (res) => {
    let newUserGoogle = {
      firstname: res.givenName,
      lastname: res.familyName,
      email: res.email,
      photo: res.photoUrl,
      password: res.id,
      google: true,
    }

    dispatch(usersActions.logInOrSignUp(newUserGoogle, "signup"))
  }

  return [formik, setFieldValue, responseGoogle, loading, error]
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: { email: "", password: "", google: false },
    onSubmit: (values) => loginHandler(values),
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(4, "Password must have at least 4 characters.")
        .required("Required"),
    }),
  })

  const loginHandler = async (values) => {
    const res = await dispatch(usersActions.logInOrSignUp(values, "login"))
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  const responseGoogle = (res) => {
    let userGoogle = {
      email: res.email,
      password: res.id,
      google: true,
    }
    dispatch(usersActions.logInOrSignUp(userGoogle, "login"))
  }

  return [formik, responseGoogle, loading, error]
}

export const useLoginLS = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    loginLS()
     // eslint-disable-next-line
  }, [])

  const loginLS = async () => {
    const token = await AsyncStorage.getItem(
      "token",
      (e) => e && console.log(e)
    )
    if (token) {
      const res = await dispatch(usersActions.logInLS(token))
      if (!res.success) {
        setError(res.error)
      }
    }
    setLoading(false)
  }

  return [loading, error]
}

export const useAddDirection = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      alias: "",
      receiver: "",
      street: "",
      number: "",
      department: "",
      zipCode: "",
      city: "",
      state: "",
    },
    onSubmit: (values) => addDirectionHandler(values),
    validationSchema: Yup.object({
      alias: Yup.string()
        .min(2, "Alias must havee at least 2 characters.")
        .required("Required"),
      receiver: Yup.string()
        .min(2, "Receiver must have at least 2 characters.")
        .required("Required"),
      street: Yup.string().required("Required"),
      number: Yup.number().required("Required"),
      department: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
    }),
  })

  const addDirectionHandler = async (values) => {
    setLoading(true)
    const res = await dispatch(usersActions.addDirection(values))
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  return [formik, loading, error]
}
export const useUpdateDirection = (direction) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      alias: direction?.alias,
      receiver: direction?.receiver,
      street: direction?.street,
      number: direction?.number,
      department: direction?.department,
      zipCode: direction?.zipCode,
      city: direction?.city,
      state: direction?.state,
    },
    onSubmit: (values) => updateDirectionHandler(values),
    validationSchema: Yup.object({
      alias: Yup.string()
        .min(2, "Alias must havee at least 2 characters.")
        .required("Required"),
      receiver: Yup.string()
        .min(2, "Receiver must have at least 2 characters.")
        .required("Required"),
      street: Yup.string().required("Required"),
      number: Yup.number().required("Required"),
      department: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
    }),
  })

  const updateDirectionHandler = async (values) => {
    setLoading(true)
    const res = await dispatch(
      usersActions.updateDirection(values, direction?._id)
    )
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  return [formik, loading, error]
}

export const useDirectionsForm = (submitCallback, initialValues) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues,
    // {
    //   alias: "",
    //   receiver: "",
    //   street: "",
    //   number: "",
    //   department: "",
    //   zipCode: "",
    //   city: "",
    //   state: "",
    // },
    onSubmit: submitCallback,
    validationSchema: Yup.object({
      alias: Yup.string(),
      receiver: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      number: Yup.number().required("Required").typeError("Must be a number"),
      department: Yup.string().required("Required"),
      zipCode: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
    }),
  })
  return formik
}

export const usePurchase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const purchase = async (data) => {
    setLoading(true)
    setError(null)
    const res = await dispatch(usersActions.purchaseHandler(data))
    if (!res.success) setError(res.error)
    setLoading(false)
    return res
  }
  return [purchase, loading, error]
}
