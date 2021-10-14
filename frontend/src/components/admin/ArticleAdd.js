import { connect, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import articlesActions from "../../redux/actions/articlesActions"
import { useEffect, useState } from "react"
import articlesUtilitiesActions from "../../redux/actions/articlesUtilitiesActions"

const ArticleAdd = (props) => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         name: "",
         brand: "",
         price: "",
         hasDiscount: "false",
         discountPrice: 0,
         photos: [],
         genres: [],
         gameType: "",
         minPlayers: "",
         maxPlayers: "",
         minAge: "",
         stock: "",
         size: "",
         weight: "",
         decoPhotos0: "",
         decoPhotos1: "",
         decoPhotos2: "",
         video: "",
         iconPhotos: "",
         description: "",
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
         photos0: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         photos1: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         photos2: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         decoPhotos0: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         decoPhotos1: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         decoPhotos2: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         video: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         iconPhotos: Yup.string()
            .url("Photos must have a valid URL")
            .required("Required"),
         genres: Yup.array().of(Yup.string()).required("Required"),
         description: Yup.string().required("Required"),
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
      // eslint-disable-next-line
   }, [])

   const { brands, genres, gameTypes } = utilities

   const submitHandler = async ({
      decoPhotos0,
      decoPhotos1,
      decoPhotos2,
      photos0,
      photos1,
      photos2,
      ...values
   }) => {
      setLoading(true)
      const res = await dispatch(
         articlesActions.addArticle({
            ...values,
            decoPhotos: [decoPhotos0, decoPhotos1, decoPhotos2],
            photos: [photos0, photos1, photos2],
         })
      )
      if (!res.success) setError(res.error)
      setLoading(false)
      props.setSection()
   }

   return (
      <div
         className="mainTeamPanel edit"
         style={{
            backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
         }}
      >
         <h2>Add Article</h2>
         <div>
            <div className="selectsEditProduct">
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="name">
                     Name
                  </label>
                  <input
                     name="name"
                     type="text"
                     className="inputEdit"
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
               <div className="selectsEditProduct">
                  <div className="inputEditProduct">
                     <label className="labelSign" htmlFor="gameType">
                        Game Type
                     </label>
                     <select
                        className="inputEdit"
                        name="gameType"
                        onChange={formik.handleChange("gameType")}
                        defaultValue=""
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
                        <small className="signErrors">
                           {formik.errors.gameType}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}
                  </div>
                  <div className="inputEditProduct">
                     <label className="labelSign" htmlFor="size">
                        Size
                     </label>
                     <select
                        className="inputEdit"
                        name="size"
                        onChange={formik.handleChange("size")}
                        defaultValue=""
                        id="size"
                     >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                     </select>
                     {formik.touched.size && formik.errors.size ? (
                        <small className="signErrors">
                           {formik.errors.size}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}
                  </div>
               </div>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="brand">
                     Brand
                  </label>
                  <select
                     name="brand"
                     className="inputEdit"
                     onChange={formik.handleChange("brand")}
                     defaultValue=""
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
               <div className="d-flex">
                  <div className="inputEditProduct col-4">
                     <label className="labelSign" htmlFor="price">
                        Price
                     </label>
                     <input
                        className="inputEdit"
                        name="price"
                        type="number"
                        placeholder="
                  Only numbers"
                        value={formik.values.price}
                        onChange={formik.handleChange("price")}
                        onBlur={formik.handleBlur("price")}
                     />
                     {formik.touched.price && formik.errors.price ? (
                        <small className="signErrors">
                           {formik.errors.price}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}
                  </div>
                  <div className="inputEditProduct col-3 ms-4 me-4 align-self-start">
                     <label className="labelSign" htmlFor="hasDiscount">
                        {" "}
                        Has Discount ?
                     </label>
                     <div
                        style={{
                           display: "flex",
                           alignItems: "center",
                           jusifyContent: "space-between",
                           width: "100%",
                        }}
                     >
                        <div style={{ marginRight: "4vmin" }}>
                           <label
                              className="labelSign white"
                              htmlFor="hasDiscount"
                           >
                              Yes
                           </label>
                           <input
                              name="hasDiscount"
                              type="radio"
                              value={true}
                              onChange={formik.handleChange("hasDiscount")}
                              onBlur={formik.handleBlur("hasDiscount")}
                           />
                        </div>
                        <div>
                           <label
                              className="labelSign white"
                              htmlFor="hasDiscount"
                           >
                              No
                           </label>
                           <input
                              name="hasDiscount"
                              type="radio"
                              value={false}
                              onChange={formik.handleChange("hasDiscount")}
                              onBlur={formik.handleBlur("hasDiscount")}
                              onClick={() =>
                                 formik.setFieldValue(
                                    "discountPrice",
                                    undefined
                                 )
                              }
                           />
                        </div>
                     </div>
                     {formik.touched.hasDiscount &&
                     formik.errors.hasDiscount ? (
                        <small className="signErrors">
                           {formik.errors.hasDiscount}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}
                  </div>
                  <div className="inputEditProduct col-4">
                     <label className="labelSign" htmlFor="discountPrice">
                        Discount
                     </label>
                     <input
                        disabled={formik.values.hasDiscount === "false"}
                        name="discountPrice"
                        type="number"
                        className="inputEdit"
                        placeholder="Must have a number"
                        value={formik.values.discountPrice}
                        onChange={formik.handleChange("discountPrice")}
                        onBlur={formik.handleBlur("discountPrice")}
                     />
                     {formik.touched.discountPrice &&
                     formik.errors.discountPrice ? (
                        <small className="signErrors">
                           {formik.errors.discountPrice}
                        </small>
                     ) : (
                        <small className="signNoErrors">NoErrors</small>
                     )}
                  </div>
               </div>
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="genres">
                  Genres
               </label>
               <div className="genresEditProduct">
                  {genres.map((genre) => {
                     return (
                        <div
                           key={genre._id}
                           style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1vmin",
                           }}
                        >
                           <p className="labelSign" htmlFor="genres">
                              {genre.name}
                           </p>
                           <input
                              name="genres"
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
         <div className="inputsConrainerAdm">
            <div className="numberAddOptions">
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="minPlayers">
                     Min. players
                  </label>
                  <input
                     className="inputEdit"
                     name="minPlayers"
                     type="number"
                     placeholder={0}
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
                  <label className="labelSign" htmlFor="maxPlayers">
                     Max. players
                  </label>
                  <input
                     className="inputEdit"
                     name="maxPlayers"
                     type="number"
                     placeholder={0}
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
                  <label className="labelSign" htmlFor="minAge">
                     Min. Age
                  </label>
                  <input
                     className="inputEdit"
                     name="minAge"
                     type="number"
                     placeholder={0}
                     value={formik.values.minAge}
                     onChange={formik.handleChange("minAge")}
                     onBlur={formik.handleBlur("minAge")}
                  />
                  {formik.touched.minAge && formik.errors.minAge ? (
                     <small className="signErrors">
                        {formik.errors.minAge}
                     </small>
                  ) : (
                     <small className="signNoErrors">NoErrors</small>
                  )}
               </div>
               <div className="inputEditProduct">
                  <label className="labelSign" htmlFor="stock">
                     Stock
                  </label>
                  <input
                     className="inputEdit"
                     name="stock"
                     type="number"
                     placeholder={0}
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
                  <label className="labelSign" htmlFor="weight">
                     Weight
                  </label>
                  <input
                     className="inputEdit"
                     name="weight"
                     type="number"
                     placeholder={0}
                     value={formik.values.weight}
                     onChange={formik.handleChange("weight")}
                     onBlur={formik.handleBlur("weight")}
                  />
                  {formik.touched.weight && formik.errors.weight ? (
                     <small className="signErrors">
                        {formik.errors.weight}
                     </small>
                  ) : (
                     <small className="signNoErrors">NoErrors</small>
                  )}
               </div>
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="iconPhotos">
                  Cover photo
               </label>
               <input
                  name="iconPhotos"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.iconPhotos}
                  onChange={formik.handleChange("iconPhotos")}
                  onBlur={formik.handleBlur("iconPhotos")}
               />
               {formik.touched.iconPhotos && formik.errors.iconPhotos ? (
                  <small className="signErrors">
                     {formik.errors.iconPhotos}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="photos0">
                  General Photos
               </label>
               <input
                  name="photos0"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.photos0}
                  onChange={formik.handleChange("photos0")}
                  onBlur={formik.handleBlur("photos0")}
               />
               {formik.touched.photos0 && formik.errors.photos0 ? (
                  <small className="signErrors">{formik.errors.photos0}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <input
                  name="photos1"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.photos1}
                  onChange={formik.handleChange("photos1")}
                  onBlur={formik.handleBlur("photos1")}
               />
               {formik.touched.photos1 && formik.errors.photos1 ? (
                  <small className="signErrors">{formik.errors.photos1}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <input
                  name="photos2"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.photos2}
                  onChange={formik.handleChange("photos2")}
                  onBlur={formik.handleBlur("photos2")}
               />
               {formik.touched.photos2 && formik.errors.photos2 ? (
                  <small className="signErrors">{formik.errors.photos2}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="decoPhotos0">
                  Decoration Photos
               </label>
               <input
                  name="decoPhotos0"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.decoPhotos0}
                  onChange={formik.handleChange("decoPhotos0")}
                  onBlur={formik.handleBlur("decoPhotos0")}
               />
               {formik.touched.decoPhotos0 && formik.errors.decoPhotos0 ? (
                  <small className="signErrors">
                     {formik.errors.decoPhotos0}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <input
                  name="decoPhotos1"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.decoPhotos1}
                  onChange={formik.handleChange("decoPhotos1")}
                  onBlur={formik.handleBlur("decoPhotos1")}
               />
               {formik.touched.decoPhotos1 && formik.errors.decoPhotos1 ? (
                  <small className="signErrors">
                     {formik.errors.decoPhotos1}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <input
                  name="decoPhotos2"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.decoPhotos2}
                  onChange={formik.handleChange("decoPhotos2")}
                  onBlur={formik.handleBlur("decoPhotos2")}
               />
               {formik.touched.decoPhotos2 && formik.errors.decoPhotos2 ? (
                  <small className="signErrors">
                     {formik.errors.decoPhotos2}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="video">
                  Video
               </label>
               <input
                  name="video"
                  type="text"
                  className="inputEdit"
                  placeholder="Must have a valid Url"
                  value={formik.values.video}
                  onChange={formik.handleChange("video")}
                  onBlur={formik.handleBlur("video")}
               />
               {formik.touched.video && formik.errors.video ? (
                  <small className="signErrors">{formik.errors.video}</small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="inputEditProduct">
               <label className="labelSign" htmlFor="description">
                  Description
               </label>
               <input
                  name="description"
                  type="text"
                  className="inputEdit"
                  placeholder="Write about the product"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
               />
               {formik.touched.description && formik.errors.description ? (
                  <small className="signErrors">
                     {formik.errors.description}
                  </small>
               ) : (
                  <small className="signNoErrors">NoErrors</small>
               )}
            </div>
            <div className="addProductButtonContainer">
               <button
                  type="button"
                  className="addProduct"
                  disabled={loading}
                  onClick={() => props.setSection()}
                  style={{
                     backgroundImage: `url("https://i.postimg.cc/L6km2Sc6/back-Google.png")`,
                  }}
               >
                  CANCEL
               </button>
               <button
                  type="button"
                  className="addProduct"
                  disabled={loading}
                  onClick={formik.handleSubmit}
                  style={{
                     backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                  }}
               >
                  ADD
               </button>     
            </div>  
         </div>
      </div>
   )
}

const mapDispatchToProps = {
   getUtilities: articlesUtilitiesActions.getAllArticlesUtilities,
}

export default connect(null, mapDispatchToProps)(ArticleAdd)
