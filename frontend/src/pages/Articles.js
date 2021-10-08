import React, {useState} from "react";
import Article from "../components/Article";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import HeroPages from "../components/HeroPages";

const Articles = () => {

  const [ articles, setArticles ] = useState([])
  /* const articles = [
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
  ]; */

  const filterArticles = (e) => {
    console.log(e)
    setArticles(e)
  }
  return (
    <>
      <div className="signInBody" style={{ backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`, }}>
        <HeroPages />
        <Header />
        <div className="bodyArticles">
            <h2>Articles</h2>
          <div className="filterContainer">
            <Filter filterArticles={(e) => filterArticles(e)}/>
            <div className="containerArticles">
              {articles.map((article) => {
                return <Article article={article} key={article._id} />;
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Articles;
