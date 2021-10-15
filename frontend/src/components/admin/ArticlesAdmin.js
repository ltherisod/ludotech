import { useState } from "react"
import { useArticles } from "../../hooks/articlesHooks"
import ArticleAdd from "./ArticleAdd"
import ArticleEdit from "./ArticleEdit"
import { useDispatch } from "react-redux"
import articlesActions from "../../redux/actions/articlesActions"
import Filter from "../Filter"
import toast from "react-hot-toast"
import PreloaderAdmin from "../PreloaderAdmin"

const ArticlesAdmin = () => {
   const [typeAction, setTypeAction] = useState("")
   const [search, setSearch] = useState({ articles: [] })
   const articlesArray = useArticles({}, typeAction)
   const [articles, loading, error] = articlesArray

   const [articleSelected, setArticleSelected] = useState("")
   const dispatch = useDispatch()
   const deleteHandler = async (id) => {
      const res = await dispatch(articlesActions.deleteArticle(id))
      if (!res.success) {
         console.log(error)
      }
      setTypeAction(typeAction + "r")
   }

   const confirm = (id) => {
      return toast.custom((t) => (
         <div
            className={`${
               t.visible ? "animate-enter" : "animate-leave"
            } bg-white flex`}
            style={{
               display: "flex",
               alignContent: "center",
               alignItems: "center",
               padding: "15px 20px",
               borderRadius: "10px",
               backgroundImage:
               "url('https://i.postimg.cc/WzHpV97Z/testtoastop70.png')",
                backgroundPosition: "center right 50px",
                   backgroundSize: "cover",
            }}
         >
            <p
               className="text-sm font-medium"
               style={{ marginBottom: 0 , color:'purple'}}
            >
               Delete article?
            </p>
            <button
               onClick={() => deleteHandler(id)}
               style={{
                  backgroundColor: "rgb(224, 81, 193)",
                  color: "white",
                  padding: "5px",
                  margin: "2px",
                  border:'none', 
                  borderRadius:'5px',
                  fontWeight:'bold'
               }}
            >
               Yes
            </button>
            <button
               onClick={() => toast.dismiss(t.id)}
               style={{
                  backgroundColor: "rgb(224, 81, 193)",
                  color: "white",
                  padding: "6px",
                  margin: "2px",
                  border:'none', 
                  borderRadius:'5px',
                  fontWeight:'bold'
               }}
            >
               No
            </button>
         </div>
      ))
   }

   const [currentPage, setCurrentPage] = useState(1)
   const filterArticles = (e) => {
      setSearch(e)
   }

   switch (typeAction) {
      case "add":
         return <ArticleAdd setSection={setTypeAction} />
      case "edit":
         return (
            <ArticleEdit setSection={setTypeAction} article={articleSelected} />
         )
      default:
         if (loading) {
            return <PreloaderAdmin />
         }
         return (
            <div
               className="mainTeamPanel articles"
               style={{
                  backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
               }}
            >
               <h2 className="articles">Products</h2>
               <p className="textPanell">
                  Add new products or search some added product to edit or
                  delete
               </p>
               <div className="containerButtonFilter">
                  <Filter
                     className="filterStockPanel"
                     filterArticles={(e) => filterArticles(e)}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                  />
                  <button
                     type="button"
                     className="buttonAdd"
                     onClick={() => setTypeAction("add")}
                  >
                     ADD NEW GAME
                  </button>
               </div>

               <>
                  <div className="theadArticlesPanel">
                     <p>Photo</p>
                     <p>Name</p>
                     <p>Brand</p>
                     <p>Price</p>
                     <p>Genres</p>
                     <p>Game Type</p>
                     <p>STOCK</p>
                     <p>Actions</p>
                  </div>
                  <div className="productsPanel">
                     {search.articles.map((article) => {
                        return (
                           <div key={article._id} className="rowStockPanel">
                              <div
                                 className="picture"
                                 style={{
                                    backgroundImage: `url("${article.photos[0]}")`,
                                    width: "7vh",
                                    height: "7vh",
                                 }}
                              ></div>
                              <p>{article.name}</p>
                              <p>Brand</p>
                              <p>{article.price}</p>
                              <p>{article.genres.map((genre) => genre.name)}</p>
                              <p>{article.gameType.name}</p>
                              <p>{article.stock}</p>
                              <p>
                                 <span
                                    type="button"
                                    className="buttonsAdminB"
                                    onClick={() => {
                                       setTypeAction("edit")
                                       setArticleSelected(article)
                                    }}
                                 >
                                    EDIT
                                 </span>
                                 <span
                                    type="button"
                                    className="buttonsAdminC"
                                    onClick={() => confirm(article._id)}
                                 >
                                    DELETE
                                 </span>
                              </p>
                           </div>
                        )
                     })}
                  </div>
                  {search.totalPages > 1 && (
                     <div
                        style={{
                           display: "flex",
                           gap: "1rem",
                           alignItems: "center",
                        }}
                     >
                        {currentPage > 1 && (
                           <button
                              type="button"
                              style={{
                                 padding: ".3rem 1.2rem",
                                 backgroundColor: "#e051c1",
                                 color: "white",
                                 border: "none",
                                 borderRadius: ".3em",
                              }}
                              onClick={() => setCurrentPage(currentPage - 1)}
                           >
                              Prev
                           </button>
                        )}
                        <p
                           style={{
                              margin: "0",
                              fontSize: "1.2rem",
                              color: "white",
                           }}
                        >
                           Current page: {currentPage}/{search.totalPages}
                        </p>
                        {currentPage < search.totalPages && (
                           <button
                              style={{
                                 padding: ".3rem 1.2rem",
                                 backgroundColor: "#e051c1",
                                 color: "white",
                                 border: "none",
                                 borderRadius: ".3em",
                              }}
                              type="button"
                              onClick={() => setCurrentPage(currentPage + 1)}
                           >
                              Next
                           </button>
                        )}
                     </div>
                  )}
               </>
            </div>
         )
   }
}

export default ArticlesAdmin
