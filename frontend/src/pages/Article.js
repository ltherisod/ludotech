import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import Footer from "../components/Footer"

const Article = () => {
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
            <Footer/>
        </div>
    )
}

export default Article