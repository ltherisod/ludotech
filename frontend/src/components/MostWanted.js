const MostWanted = () => {
    return(
        <div className="mostWantedConteiner">
            <h2 className="mostWantedTittle">Most wanted products</h2>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/vBjXvR4V/card-Style3.png')"}}>
            <div className="mostWantedGameConteiner" >
            <h2 className="mostWantedGameBrand">Kingdomino</h2>
            <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/G34zMpJT/test.png')"}}></div>
            </div>
        </div>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/7ZjmrrHY/card-Style4.png')"}}>
        <div className="mostWantedGameConteinerLeft" >
             <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/rps6pkx6/dungeon-Academy.png')"}}></div>
            <h2 className="mostWantedGameBrand">Dungeon Academy</h2> 
            </div>
        </div>
        <div className="mostWantedCard" style={{backgroundImage: "url('https://i.postimg.cc/vBjXvR4V/card-Style3.png')"}}>
            <div className="mostWantedGameConteiner" >
            <h2 className="mostWantedGameBrand">Takenoko</h2>
            <div className="mostWantedGame" style={{backgroundImage: "url('https://i.postimg.cc/7hK0wdzL/takenoko.png')"}}></div>
            </div>
        </div>
        </div>
    )
}

export default MostWanted