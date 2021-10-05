import React from "react"
import Article from "../components/Article"

const Articles = () => {
   const articles = [
      {
         id: 1,
         name: "Pictionary",
         img: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
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
         img: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
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
         id: 3,
         name: "Pictionary",
         img: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
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
         img: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
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
         img: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
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
         id: 6,
         name: "Pictionary",
         img: "https://i.postimg.cc/3wym5Rxt/pictionary.jpg",
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
      // <Header />
      <div>
         <div>
            {/* Slice de fondo con productos */}
            <h1>Articles</h1>
         </div>
         <div className="containerArticles">
            {articles.map((article, id) => {
               return <Article article={article} key={id} />
            })}
         </div>
      </div>
      // <Footer />
   )
}

export default Articles
