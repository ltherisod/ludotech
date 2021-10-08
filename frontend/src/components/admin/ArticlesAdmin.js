import { useState } from "react"
import { useArticles } from "../../hooks/articlesHooks"
import ArticleAdd from "./ArticleAdd"
import ArticleDelete from "./ArticleDelete"
import ArticleEdit from "./ArticleEdit"

const ArticlesAdmin = () => {
   const articlesArray = useArticles({})
   const [articles, loading, error] = articlesArray
   const [typeAction, setTypeAction] = useState("")
   const [articleSelected, setArticleSelected] = useState("")
   switch (typeAction) {
      case "add":
         return <ArticleAdd setSection={setTypeAction} />
      case "edit":
         return (
            <ArticleEdit setSection={setTypeAction} article={articleSelected} />
         )
      case "delete":
         return <ArticleDelete setSection={setTypeAction} />
      default:
         return (
            <div className="containerArticlesAdmin">
               <div className="buttonsAdminArticles">
                  <button
                     type="button"
                     className="buttonsAdmin"
                     onClick={() => setTypeAction("add")}
                  >
                     ADD
                  </button>
                  <input type="text" placeholder="ACA VA EL FILTRO" />
               </div>
               {loading ? (
                  <h2>Loading...</h2>
               ) : (
                  <table>
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Brand</th>
                           <th>Price</th>
                           <th>Genres</th>
                           <th>Game Type</th>
                           <th>STOCK</th>
                           <th>-</th>
                        </tr>
                     </thead>
                     <tbody>
                        {articles.map((article) => {
                           return (
                              <tr key={article._id}>
                                 <td>{article.name}</td>
                                 <td>Brand</td>
                                 <td>{article.price}</td>
                                 <td>
                                    {article.genres.map((genre) => genre.name)}
                                 </td>
                                 <td>{article.gameType.name}</td>
                                 <td>{article.stock}</td>
                                 <td>
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
                                       className="buttonsAdminB"
                                       onClick={() => setTypeAction("delete")}
                                    >
                                       DELETE
                                    </span>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               )}
            </div>
         )
   }
}

export default ArticlesAdmin
