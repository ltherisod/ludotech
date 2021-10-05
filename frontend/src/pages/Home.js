const Home = () => {
    return (
      <div className='body' style={{ backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")` }}>
      <header>

      </header>
      <main>
      <div className='hero' style={{ backgroundImage: `url("https://i.postimg.cc/QdTXy2Wx/herofixed.png")` }} >
          <div className='heroDescription'>
              <div>
                <h1>Welcome to the land of the game</h1>
                <button><h4>Let´s go there</h4></button>
              </div>    
          </div>
          <div className='cube' style={{backgroundImage: "url('/assets/rubik.png')"}}></div>
        </div>
        <h2 >Most wanted products</h2>
        <div className='wanted'>
            <div className='wantedCards' style={{backgroundImage: "url('/assets/Juego1.png')"}}></div>
            <div className='wantedCards' style={{backgroundImage: "url('/assets/Juego2.png')"}}></div>
            <div className='wantedCards' style={{backgroundImage: "url('/assets/Juego1.png')"}}></div>
        </div>
      </main>
      <footer>
          <p>© Copyright 2021 | Ludotech</p>
      </footer>
      </div>
    );
  };
  
  export default Home;

  /* https://i.postimg.cc/52BjNsw3/fondo-Blanco.png */

  /* https://i.postimg.cc/zDhycDV6/fondoblanco2.png */

  /* https://i.postimg.cc/3wVXYt59/back-Ludo3.png */