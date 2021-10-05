import React from "react"
import Article from "../components/Article"
import Header from "../components/Header"

const Articles = () => {
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
      <>
         <Header />
         <div
            className="bodyArticles"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <div
               className="heroArticles"
               style={{
                  backgroundImage: `url("https://i.postimg.cc/QdTXy2Wx/herofixed.png")`,
               }}
            >
               {/* Slice de fondo con productos */}
               <h1>Articles</h1>
            </div>
            <h2 style={{ textAlign: "center", color: "white", padding: 10 }}>
               ACA VA EL FILTRO
            </h2>
            <div className="containerArticles">
               {articles.map((article, id) => {
                  return <Article article={article} key={id} />
               })}
            </div>
         </div>
      </>
   )
}

export default Articles
