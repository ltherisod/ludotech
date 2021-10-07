import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"
import ArticleRelated from "../components/ArticleRelated"

const ArticlePage = () => {
    const articles = [
        {
          id: 1,
          name: "Exploding kittens",
          photos: "https://i.postimg.cc/zvK7kHVH/transform-rs-w.jpg",
          price: 200,
          hasDiscount: false,
          discountPrice: null,
          genres: "Party",
          gameType: "Card game",
          minPlayers: 3,
          maxPlayers: 8,
          minAge: 8,
          stock: 57,
        },
        {
          id: 2,
          name: "King of tokyo",
          photos: "https://i.postimg.cc/yNH9CpQ5/King-Of-Tokyo2016-caja-web.png",
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
          name: "Pandemic Cthulhu",
          photos: "https://i.postimg.cc/RZsQ5xJ0/pandemic-Cthulhu.png",
          price: 5350,
          hasDiscount: false,
          discountPrice: null,
        }, 
      ];
    return(
        <div className="bodyArticle" style={{backgroundImage: `url("https://i.postimg.cc/zDhycDV6/fondoblanco2.png")`}}>
            <HeroPages/>
            <Header/>
            <div className="articleData" >
                <div className="articlePhoto" style={{backgroundImage: `url("https://i.postimg.cc/gJvGymjx/codexBox.png")`}}>
                </div>
                <div className="articleName"><p>Codex naturalis</p></div>
            </div>
            <div className="articleDecoUp">
                <div className="articleDeco" style={{backgroundImage: `url("https://i.postimg.cc/tRKpHcf4/codex-Deco2.png")`}}></div>
            </div>
            <div className="articleDescription">
            <p>Assemble the pages of the Codex Naturalis, the secret manuscript which lists the species of the four kingdoms that live in the primary forests. Play and place your cards to use resources, fulfill the objectives to create the most elaborate manuscript. When a player reaches 20 points or more, the end of the game is triggered.</p>
            </div>
           <div className="articleDecoRight">
                 <div className="articleDeco" style={{backgroundImage: `url("https://i.postimg.cc/zfQXHGdn/codex-Deco3.png")`}}></div>
           </div>
            <div className="articleDecoDown">
            <div className="articleDeco" style={{backgroundImage: `url("https://i.postimg.cc/5NmMNsQM/codex-Deco4.png")`}}></div>
            </div>
            <iframe width="580" height="325" src="https://www.youtube.com/embed/G6uOAoEerzc?start=33" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style={{alignSelf:"center"}}></iframe>
                <h3 className="articleRelatedTittle">Products related </h3>
            <div className="relatedArticles">
                {articles.map((article, id) => {
                return <ArticleRelated article={article} key={id} />
              })}
            </div>
            <Footer/>
        </div>
    )
}

export default ArticlePage