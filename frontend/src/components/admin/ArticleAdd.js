import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import articlesActions from "../../redux/actions/articlesActions"
import { useState } from "react"

const ArticleAdd = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         name: "",
         brand: "",
         price: "",
         hasDiscount: false,
         discountPrice: false,
         photos: [],
         genres: [],
         gameType: "",
         minPlayers: "",
         maxPlayers: "",
         minAge: "",
         stock: "",
         size: "",
         weight: "",
      },
      onSubmit: (values) => submitHandler(values),
      validationSchema: Yup.object({
         name: Yup.string()
            .min(2, "Name must have at least 2 characters")
            .required("Required"),
         brand: Yup.string()
            .min(2, "Brand must have at least 2 characters")
            .required("Required"),
         price: Yup.number("Price must have a number").required("Required"),
         hasDiscount: Yup.boolean(),
         discountPrice: Yup.number(),
         photos: Yup.string("Photos must have a valid URL")
            .url("Photos must have a valid URL")
            .required("Required"),
         genres: Yup.string()
            .min(2, "Genres must have at least 2 characters")
            .required("Required"),
         gameType: Yup.string()
            .min(2, "Game Type must have at least 2 characters")
            .required("Required"),
         minPlayers: Yup.number("Min Players must have a number").required(
            "Required"
         ),
         maxPlayers: Yup.number("Max Players must have a number").required(
            "Required"
         ),
         minAge: Yup.number("Min Age must have a number").required("Required"),
         stock: Yup.number("Stock must have a number").required("Required"),
         size: Yup.string()
            .min(2, "Size must have at least 2 characters")
            .required("Required"),
         weight: Yup.number("Weight must have a number").required("Required"),
      }),
   })

   const submitHandler = (values) => {
      setLoading(true)
      const res = dispatch(articlesActions.addArticle(values))
      console.log(res)
      if (!res.success) setError(res.error)
      setLoading(false)
   }

   return (
      <>
         <h2>Add Article</h2>
         <div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="name">
                  Name
               </label>
               <input
                  name="name"
                  type="text"
                  placeholder="Must have 2+ characters"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
               />
               {formik.touched.name && formik.errors.name ? (
                  <small className="signErrors">{formik.errors.name}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="brand">
                  Brand
               </label>
               <input
                  name="brand"
                  type="text"
                  placeholder="Must have 2+ characters"
                  value={formik.values.brand}
                  onChange={formik.handleChange("brand")}
                  onBlur={formik.handleBlur("brand")}
               />
               {formik.touched.brand && formik.errors.brand ? (
                  <small className="signErrors">{formik.errors.brand}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="price">
                  Price
               </label>
               <input
                  name="price"
                  type="number"
                  placeholder="
               Only numbers"
                  value={formik.values.price}
                  onChange={formik.handleChange("price")}
                  onBlur={formik.handleBlur("price")}
               />
               {formik.touched.price && formik.errors.price ? (
                  <small className="signErrors">{formik.errors.price}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="hasDiscount">
                  Has Discount ?
               </label>
               <input
                  name="hasDiscount"
                  type="radio"
                  placeholder="Must have 2+ characters"
                  value={formik.values.hasDiscount}
                  onChange={formik.handleChange("hasDiscount")}
                  onBlur={formik.handleBlur("hasDiscount")}
               />
               Yes
               <input
                  name="hasDiscount"
                  type="radio"
                  placeholder="Must have 2+ characters"
                  value={formik.values.hasDiscount}
                  onChange={formik.handleChange("hasDiscount")}
                  onBlur={formik.handleBlur("hasDiscount")}
               />
               No
               {formik.touched.hasDiscount && formik.errors.hasDiscount ? (
                  <small className="signErrors">
                     {formik.errors.hasDiscount}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="discountPrice">
                  Discount Price
               </label>
               <input
                  name="discountPrice"
                  type="number"
                  placeholder="Must have a number"
                  value={formik.values.discountPrice}
                  onChange={formik.handleChange("discountPrice")}
                  onBlur={formik.handleBlur("discountPrice")}
               />
               {formik.touched.discountPrice && formik.errors.discountPrice ? (
                  <small className="signErrors">
                     {formik.errors.discountPrice}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="photos">
                  Photos
               </label>
               <input
                  name="photos"
                  type="text"
                  placeholder="Must have a valid Url"
                  value={formik.values.photos}
                  onChange={formik.handleChange("photos")}
                  onBlur={formik.handleBlur("photos")}
               />
               {formik.touched.photos && formik.errors.photos ? (
                  <small className="signErrors">{formik.errors.photos}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="genres">
                  Genres
               </label>
               <input
                  name="genres"
                  type="text"
                  placeholder="Must have 2+ characters"
                  value={formik.values.genres}
                  onChange={formik.handleChange("genres")}
                  onBlur={formik.handleBlur("genres")}
               />
               {formik.touched.genres && formik.errors.genres ? (
                  <small className="signErrors">{formik.errors.genres}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
         </div>
         <div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="gameType">
                  Game Type
               </label>
               <input
                  name="gameType"
                  type="text"
                  placeholder="Must have 2+ characters"
                  value={formik.values.gameType}
                  onChange={formik.handleChange("gameType")}
                  onBlur={formik.handleBlur("gameType")}
               />
               {formik.touched.gameType && formik.errors.gameType ? (
                  <small className="signErrors">{formik.errors.gameType}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="minPlayers">
                  Minimum players
               </label>
               <input
                  name="minPlayers"
                  type="number"
                  placeholder="Must have a number"
                  value={formik.values.minPlayers}
                  onChange={formik.handleChange("minPlayers")}
                  onBlur={formik.handleBlur("minPlayers")}
               />
               {formik.touched.minPlayers && formik.errors.minPlayers ? (
                  <small className="signErrors">
                     {formik.errors.minPlayers}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="maxPlayers">
                  Maximum players
               </label>
               <input
                  name="maxPlayers"
                  type="number"
                  placeholder="Must have a number"
                  value={formik.values.maxPlayers}
                  onChange={formik.handleChange("maxPlayers")}
                  onBlur={formik.handleBlur("maxPlayers")}
               />
               {formik.touched.maxPlayers && formik.errors.maxPlayers ? (
                  <small className="signErrors">
                     {formik.errors.maxPlayers}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="minAge">
                  Minimum Age
               </label>
               <input
                  name="minAge"
                  type="number"
                  placeholder="Must have a number"
                  value={formik.values.minAge}
                  onChange={formik.handleChange("minAge")}
                  onBlur={formik.handleBlur("minAge")}
               />
               {formik.touched.minAge && formik.errors.minAge ? (
                  <small className="signErrors">{formik.errors.minAge}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="stock">
                  Stock
               </label>
               <input
                  name="stock"
                  type="number"
                  placeholder="Must have a number"
                  value={formik.values.stock}
                  onChange={formik.handleChange("stock")}
                  onBlur={formik.handleBlur("stock")}
               />
               {formik.touched.stock && formik.errors.stock ? (
                  <small className="signErrors">{formik.errors.stock}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="size">
                  Size
               </label>
               <input
                  name="size"
                  type="text"
                  placeholder="Must have 2+ characters"
                  value={formik.values.size}
                  onChange={formik.handleChange("size")}
                  onBlur={formik.handleBlur("size")}
               />
               {formik.touched.size && formik.errors.size ? (
                  <small className="signErrors">{formik.errors.size}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputContainer">
               <label className="labelSign" htmlFor="weight">
                  Weight
               </label>
               <input
                  name="weight"
                  type="number"
                  placeholder="Must have a number"
                  value={formik.values.weight}
                  onChange={formik.handleChange("weight")}
                  onBlur={formik.handleBlur("weight")}
               />
               {formik.touched.weight && formik.errors.weight ? (
                  <small className="signErrors">{formik.errors.weight}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <button
               type="button"
               className="flex signupButtonSignup"
               disabled={loading}
               onClick={formik.handleSubmit}
               style={{
                  backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
               }}
            >
               ADD
            </button>
         </div>
      </>
   )
}

export default ArticleAdd
