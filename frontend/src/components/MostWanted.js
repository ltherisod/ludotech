const MostWanted = () => {
    return(
        <div className="mostWantedConteiner">
            <h2 className="mostWantedTittle">Most wanted products</h2>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/X72DB3X8/card-Style2.png')"}}>
            <div className="mostWantedGameConteiner" >
            <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/vmHGJNnx/king-of-tokyo.png')"}}></div>
            <div className="mostWantedGameBrand" style={{backgroundImage: "url('https://i.postimg.cc/26SFBrZj/favpng-king-of-tokyo-logo-clip-art-board-game-brand.png')"}}> </div>
            </div>
        </div>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/X72DB3X8/card-Style2.png')"}}>
        <div className="mostWantedGameConteiner" >
            <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/520mFkrW/pickle-Rick.png')"}}></div>
            <div className="mostWantedGameBrand" style={{backgroundImage: "url('https://i.postimg.cc/26SFBrZj/favpng-king-of-tokyo-logo-clip-art-board-game-brand.png')"}}> </div>
            </div>
        </div>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/X72DB3X8/card-Style2.png')"}}></div>
        </div>
    )
}

export default MostWanted