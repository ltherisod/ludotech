import { useState } from "react"
import { useArticles } from "../../hooks/articlesHooks"
import ArticleAdd from "./ArticleAdd"
import ArticleDelete from "./ArticleDelete"
import { ArticleEdit } from "./ArticleEdit"

const ArticlesAdmin = () => {
   const articlesArray = useArticles({})
   const [articles, loading, error] = articlesArray
   const [typeAction, setTypeAction] = useState("")
   //    const articles = [
   //       {
   //          id: 1,
   //          name: "Pictionary",
   //          photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
   //          price: 5350,
   //          hasDiscount: false,
   //          discountPrice: null,
   //          genres: "Genero",
   //          gameType: "Board game",
   //          minPlayers: 4,
   //          maxPlayers: 8,
   //          minAge: 8,
   //          stock: 57,
   //       },
   //       {
   //          id: 2,
   //          name: "Pictionary",
   //          photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
   //          price: 5350,
   //          hasDiscount: true,
   //          discountPrice: 3890,
   //          genres: "Genero",
   //          gameType: "Board game",
   //          minPlayers: 4,
   //          maxPlayers: 8,
   //          minAge: 8,
   //          stock: 57,
   //       },
   //    ]
   //    if (!admin) {
   //     return <p>You have no access to this section.</p>
   //   }
   switch (typeAction) {
      case "add":
         return <ArticleAdd setSection={setTypeAction} />
      case "edit":
         return <ArticleEdit setSection={setTypeAction} />
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
                  <button
                     type="button"
                     className="buttonsAdmin"
                     onClick={() => setTypeAction("edit")}
                  >
                     EDIT
                  </button>
                  <button
                     type="button"
                     className="buttonsAdmin"
                     onClick={() => setTypeAction("delete")}
                  >
                     DELETE
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
