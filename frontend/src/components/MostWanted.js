const MostWanted = () => {
    // https://i.postimg.cc/7Lrtmh1M/card-Style53.png
    return(
        <div className="mostWantedConteiner">
            <h2 className="mostWantedTittle">Most wanted products</h2>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/RZ72rwZb/card-Style53left.png')"}}>
            <div className="mostWantedGameConteiner" >
            <h2 className="mostWantedGameBrand">King of Tokio</h2>
            <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/yNH9CpQ5/King-Of-Tokyo2016-caja-web.png')"}}></div>
            </div>
        </div>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/7Lrtmh1M/card-Style53.png')"}}>
        <div className="mostWantedGameConteinerLeft" >
             <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/RZsQ5xJ0/pandemic-Cthulhu.png')"}}></div>
            <h2 className="mostWantedGameBrand">Pandemic Cthulhu</h2> 
            </div>
        </div>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/RZ72rwZb/card-Style53left.png')"}}>
            <div className="mostWantedGameConteiner" >
            <h2 className="mostWantedGameBrand">Exploding Kittens</h2>
            <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/fT9jtmhZ/exploding-Kittens-Icon.png')"}}></div>
            </div>
        </div>
        </div>
    )
}

export default MostWanted