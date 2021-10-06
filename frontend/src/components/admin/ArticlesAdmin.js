const ArticlesAdmin = () => {
   const articles = [
      {
         id: 1,
         name: "Pictionary",
         photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
         price: 5350,
         hasDiscount: false,
         discountPrice: null,
         genres: "Genero",
         gameType: "Board game",
         minPlayers: 4,
         maxPlayers: 8,
         minAge: 8,
         stock: 57,
      },
      {
         id: 2,
         name: "Pictionary",
         photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
         price: 5350,
         hasDiscount: true,
         discountPrice: 3890,
         genres: "Genero",
         gameType: "Board game",
         minPlayers: 4,
         maxPlayers: 8,
         minAge: 8,
         stock: 57,
      },
      {
         id: 3,
         name: "Pictionary",
         photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
         price: 5350,
         hasDiscount: false,
         discountPrice: null,
         genres: "Genero",
         gameType: "Board game",
         minPlayers: 4,
         maxPlayers: 8,
         minAge: 8,
         stock: 57,
      },
      {
         id: 4,
         name: "Pictionary",
         photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
         price: 5350,
         hasDiscount: true,
         discountPrice: 3890,
         genres: "Genero",
         gameType: "Board game",
         minPlayers: 4,
         maxPlayers: 8,
         minAge: 8,
         stock: 57,
      },
      {
         id: 5,
         name: "Pictionary",
         photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
         price: 5350,
         hasDiscount: false,
         discountPrice: null,
         genres: "Genero",
         gameType: "Board game",
         minPlayers: 4,
         maxPlayers: 8,
         minAge: 8,
         stock: 57,
      },
      {
         id: 6,
         name: "Pictionary",
         photos: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
         price: 5350,
         hasDiscount: true,
         discountPrice: 3890,
         genres: "Genero",
         gameType: "Board game",
         minPlayers: 4,
         maxPlayers: 8,
         minAge: 8,
         stock: 57,
      },
   ]

   return (
      <div className="containerArticlesAdmin">
         <h5>Soy components/admin/ArticlesAdmin</h5>
         <div className="buttonsAdminArticles">
            <button type="button" className="buttonsAdmin">
               ADD
            </button>
            <button type="button" className="buttonsAdmin">
               EDIT
            </button>
            <button type="button" className="buttonsAdmin">
               DELETE
            </button>
            <input type="text" placeholder="ACA VA EL FILTRO" />
         </div>
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
                     <tr>
                        <td>{article.name}</td>
                        <td>Brand</td>
                        <td>{article.price}</td>
                        <td>{article.genres}</td>
                        <td>{article.gameType}</td>
                        <td>{article.stock}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   )
}

export default ArticlesAdmin
