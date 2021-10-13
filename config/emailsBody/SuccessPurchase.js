const SuccessPurchase = (data) => {
  console.log(data)
  return `<body style="margin: 0;padding: 0;box-sizing: border-box;font-family:Poppins,sans-serif;text-decoration: none;background-color:#8646d4;width:100vw">
    <header style="width: 100vw;">
        <div style="width:200px;height:75px;margin-top:24px;margin-left:24px;background-image:url(https://i.imgur.com/OJD9TIm.png);background-position:center;background-size:cover;background-repeat:no-repeat"></div>
    </header>
    <main style="width:80vw;margin-left:20px;">
      <h3>Hello ${data.user.firstname + ' ' + data.user.lastname}</h3>
      <p style="font-size:1.2rem">We´re glad to let you know that the purchase has been successfully completed.</p>
      <br/>
      <p>Thank you for your purchase.</p>
      <p>Please click <span style="font-size:1.2rem;color:#542b86;text-decoration:underline;"><a href="http://localhost:3000">here</a></span> to go back to your user account.</p>
      <br/>
    </main>
    <footer style="">
      <span style="font-size:0.8">Ludotech</span>
    </footer>
  </body>`
}
  
module.exports = SuccessPurchase

// <div style="width:100vw;height:40vh;background-image:url(https://i.postimg.cc/L2XVbY6Q/hero-Pages.png);background-position:top;background-size:cover;background-repeat:no-repeat;display:flex;justify-content:flex-start;align-items:flex-end; ">      </div>

