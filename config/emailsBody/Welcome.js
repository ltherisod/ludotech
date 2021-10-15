const WelcomeMail = (data) => {
  return `<body style="margin: 0;padding: 0;box-sizing: border-box;font-family:Poppins,sans-serif;text-decoration: none;background-image:url(https://i.postimg.cc/ydvRcV6q/mail.png);background-position:center;background-size:cover;background-repeat:no-repeat;width:100vw;padding-left:20px;">
    <header style="width: 100vw;">
      <div style="width:40vw;height:15vh;margin-top:24px;margin-left:24px;background-image:url(https://i.postimg.cc/K8BgQ7cD/logo-Sumary.png);background-position:center;background-size:cover;background-repeat:no-repeat"></div>
    </header>
    <main style="width:80vw;padding-left:20px;">
      <h3>Hello ${data.firstname + ' ' + data.lastname}</h3>
      <p style="font-size:1.2rem">Welcome to <span style="font-size:1.5rem">Ludotech</span> where you will find all the game you desire.</p>
      <p>We´re glad to have you in our comunity to find and share opinions about the games.</p>
      <br/>
      <p>Now you can go and search for the best games we offer for you <a href="https://lodotechgames.herokuapp.com">here</a>
    </main>
  </body>`
}

module.exports = WelcomeMail