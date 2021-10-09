import { connect, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import articlesActions from "../../redux/actions/articlesActions"
import { useEffect, useState } from "react"
import articlesUtilitiesActions from "../../redux/actions/articlesUtilitiesActions"

const ArticleEdit = (props) => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const dispatch = useDispatch()

   const {
      name,
      brand,
      price,
      hasDiscount,
      discountPrice,
      photos,
      gameType,
      minPlayers,
      maxPlayers,
      minAge,
      stock,
      size,
      weight,
      _id,
   } = props.article

   const formik = useFormik({
      initialValues: {
         name,
         brand: brand._id,
         price,
         hasDiscount: hasDiscount ? "true" : "false",
         discountPrice,
         photos: photos[0],
         genres: props.article.genres.map((genre) => genre._id),
         gameType: gameType._id,
         minPlayers,
         maxPlayers,
         minAge,
         stock,
         size,
         weight,
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
         hasDiscount: Yup.boolean("NADAAAA"),
         discountPrice: Yup.number(),
         photos: Yup.string("Photos must have a valid URL")
            .url("Photos must have a valid URL")
            .required("Required"),
         genres: Yup.array().of(Yup.string()).required("Required"),
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

   const [utilities, setUtilities] = useState({
      brands: [],
      genres: [],
      gameTypes: [],
   })
   useEffect(() => {
      const traer = async () => {
         const getUtilities = await props
            .getUtilities()
            .then((res) => setUtilities(res.response))
      }
      traer()
   }, [])

   const { brands, genres, gameTypes } = utilities

   const submitHandler = async (values) => {
      setLoading(true)
      const res = await dispatch(articlesActions.updateArticle(_id, values))
      if (!res.success) setError(res.error)
      setLoading(false)
      props.setSection()
   }

   return (
      <div className='mainTeamPanel edit' style={{backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`}}>
         <h2>Edit Article</h2>
         <div>
            <div className='selectsEditProduct'>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="name">Name</label>
                  <input
                     name="name"
                     type="text"
                     className='inputEdit'
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
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="brand">
                     Brand
                  </label>
                  <select
                  className='inputEdit'
                     name="brand"
                     onChange={formik.handleChange("brand")}
                     value={formik.values.brand}
                  >
                     <option value="">Select brand</option>
                     {!brands.length ? (
                        <h2>Loading</h2>
                     ) : (
                        brands.map((brand) => (
                           <option key={brand._id} value={brand._id}>
                              {brand.name}
                           </option>
                        ))
                     )}
                  </select>
                  {formik.touched.brand && formik.errors.brand ? (
                     <small className="signErrors">{formik.errors.brand}</small>
                  ) : (
                     <small className="signNoErrors">NoErrors</small>
                  )}
               </div>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="price">
                     Price
                  </label>
                  <input
                  className='inputEdit'
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
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="gameType">Game Type</label>
                  <select
                     name="gameType"
                     className='inputEdit'
                     onChange={formik.handleChange("gameType")}
                     value={formik.values.gameType}
                     id="gameType"
                  >
                     <option value="">Select Game Type</option>
                     {gameTypes.map((gameType) => (
                        <option key={gameType._id} value={gameType._id}>
                           {gameType.name}
                        </option>
                     ))}
                  </select>
                  {formik.touched.gameType && formik.errors.gameType ? (
                     <small className="signErrors">{formik.errors.gameType}</small>
                  ) : (
                     <small className="signNoErrors">NoErrors</small>
                  )}
               </div>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="size">Size</label>
                  <input
                     name="size"
                     type="text"
                     className='inputEdit'
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
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="discountPrice">Discount</label>
                  <input
                     disabled={formik.values.hasDiscount === "false"}
                     name="discountPrice"
                     type="number"
                     className='inputEdit'
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
            </div>
            <div style={{display:'flex', jusifyContent: 'space-between'}}>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="genres">Genres</label>
                  <div className='genresEditProduct'>
                     {genres.map((genre) => {
                        return (
                           <div key={genre._id} style={{display: 'flex', alignItems: 'center', gap: '1vmin'}}>
                              <p className="labelSign" htmlFor="genres">{genre.name}</p>
                              <input
                                 name="genres"
                                 className='inputCheck'
                                 checked={formik.values.genres?.some(
                                    (id) => id === genre._id
                                 )}
                                 type="checkbox"
                                 placeholder="Must have 2+ characters"
                                 value={genre._id}
                                 onChange={formik.handleChange("genres")}
                                 onBlur={formik.handleBlur("genres")}
                              />
                           </div>
                        )
                     })}
                  </div>
                  {formik.touched.genres && formik.errors.genres ? (
                     <small className="signErrors">{formik.errors.genres}</small>
                  ) : (
                     <small className="signNoErrors">NoErrors</small>
                  )}
               </div>
            </div>
         </div>
         <div>
            <div className='numberOptions'>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="hasDiscount">Has Discount ?</label>
                  <div style={{display: 'flex', alignItems: 'center', jusifyContent: 'space-between', width: '100%'}}>
                     <div style={{marginRight: '2vmin'}}>
                        <label className="labelSign" htmlFor="hasDiscount">Yes</label>
                        <input
                           checked={formik.values.hasDiscount === "true"}
                           name="hasDiscount"
                           type="radio"
                           value={true}
                           onChange={formik.handleChange("hasDiscount")}
                           onBlur={formik.handleBlur("hasDiscount")}
                        />
                     </div>
                     <div>
                        <label className="labelSign" htmlFor="hasDiscount">No</label>
                        <input
                           checked={formik.values.hasDiscount === "false"}
                           name="hasDiscount"
                           type="radio"
                           value={false}
                           onChange={formik.handleChange("hasDiscount")}
                           onBlur={formik.handleBlur("hasDiscount")}
                           onClick={() =>
                              formik.setFieldValue("discountPrice", undefined)
                           }
                        />
                     </div>
                  </div>

                  {formik.touched.hasDiscount && formik.errors.hasDiscount ? (
                     <small className="signErrors">
                        {formik.errors.hasDiscount}
                     </small>
                  ) : (
                     <small className="signNoErrors">NoErrors</small>
                  )}
               </div>
                  <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="minPlayers">Min. players</label>
                  <input
                     name="minPlayers"
                     type="number"
                     className='inputEdit'
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
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="maxPlayers">Max. players</label>
               <input
                  name="maxPlayers"
                  type="number"
                  className='inputEdit'
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
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="minAge">Min. Age</label>
               <input
                  name="minAge"
                  type="number"
                  className='inputEdit'
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
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="stock">Stock</label>
               <input
                  name="stock"
                  type="number"
                  className='inputEdit'
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
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="weight">Weight</label>
               <input
                  name="weight"
                  type="number"
                  className='inputEdit'
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
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="photos">Photos</label>
               <input
                  name="photos"
                  type="text"
                  className='inputEdit'
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
            <button
               type="button"
               className="addProduct"
               disabled={loading}
               onClick={formik.handleSubmit}
               style={{backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`}}
            >
               ADD
            </button>
         </div>
      </div>
   )
}

const mapDispatchToProps = {
   getArticle: articlesActions.getArticle,
   getUtilities: articlesUtilitiesActions.getAllArticlesUtilities,
}

export default connect(null, mapDispatchToProps)(ArticleEdit)
