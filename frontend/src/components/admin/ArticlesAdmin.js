import { useState } from "react"
import { useArticles } from "../../hooks/articlesHooks"
import ArticleAdd from "./ArticleAdd"
import ArticleEdit from "./ArticleEdit"
import { useDispatch } from "react-redux"
import articlesActions from "../../redux/actions/articlesActions"
import Filter from "../Filter"

const ArticlesAdmin = () => {
   const [typeAction, setTypeAction] = useState("")
   const [search, setSearch] = useState([])
   const articlesArray = useArticles({}, typeAction)
   const [articles, loading, error] = articlesArray

   const [articleSelected, setArticleSelected] = useState("")
   // const [error, setError] = useState(null)
   const dispatch = useDispatch()
   const deleteHandler = async (id) => {
      const res = await dispatch(articlesActions.deleteArticle(id))
      // if (!res.success) setError(res.error)
      // setLoading(false)
      console.log(res)
      setTypeAction(typeAction + "r")
   }

   const filterArticles = (e) => {
      console.log(e)
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
         return (
            <div
               className="mainTeamPanel articles"
               style={{
                  backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
               }}
            >
               <h2 className='articles'>Orders</h2>
               <p className='textPanell'>Add new products or search some added product to edit or delete</p>
               <div className="containerButtonFilter">
               <Filter className='filterStockPanel' filterArticles={(e) => filterArticles(e)} />
                     <button
                        type="button"
                        className="buttonAdd"
                        onClick={() => setTypeAction("add")}
                     >
                        ADD NEW GAME
                     </button>
                  
               </div>

               {loading ? (
                  <h2>Loading...</h2>
               ) : (
                  <>
                     {/* <p  className='textArticlesPanel textPanell'>Find all products that you can sell in your store</p> */}
                     <div class='theadArticlesPanel'>
                        <p>Photo</p>
                        <p>Name</p>
                        <p>Brand</p>
                        <p>Price</p>
                        <p>Genres</p>
                        <p>Game Type</p>
                        <p>STOCK</p>
                        <p>Actions</p>
                     </div>
                     <div className='productsPanel'>
                        {search.map((article) => {
                           return (
                              <div key={article._id} className='rowStockPanel'>
                                 <div className='picture' style={{backgroundImage: `url("${article.photos[0]}")`, width: '7vh', height: '7vh'}}></div>
                                 <p>{article.name}</p>
                                 <p>Brand</p>
                                 <p>{article.price}</p>
                                 <p>
                                    {article.genres.map((genre) => genre.name)}
                                 </p>
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
                                       onClick={() =>
                                          deleteHandler(article._id)
                                       }
                                    >
                                       DELETE
                                    </span>
                                 </p>
                              </div>
                           )
                        })}
                     </div>
                  </>
               )}
            </div>
         )
   }
}

export default ArticlesAdmin
