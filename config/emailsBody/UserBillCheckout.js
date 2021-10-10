const UserBillCheckout = (data) => {
  return  `<body style="margin: 0;padding: 0;box-sizing: border-box;font-family:Poppins,sans-serif;text-decoration: none;background-color:#8646d4">
    <header style="width: 100vw;">
      <div style="width:100vw;height:40vh;background-image:url(https://i.postimg.cc/L2XVbY6Q/hero-Pages.png);background-position:top;background-size:cover;background-repeat:no-repeat;display:flex;justify-content:center;align-items:flex-end; ">
        <h2 style="background-color:transparent;">LUDOTECH</h2>
      </div>
    </header>
    <main style="width:80vw;margin:0 auto;">
      <h3>Hello ${data.name}</h3>
      <p style="font-size:1.2rem">We are sending you the bill of the purchase Nº{numero de compra con link a la compra en user settings??}.</p>
      <br/>
      <p>Thank you for your purchase.</p>
      <p>Please click <span style="font-size:1.2rem;color:#542b86;text-decoration:underline;"><a href="http://localhost:3000">here</a> to go back to your user account.</p>
    </main>
    <footer style="">
      <span style="font-size:0.8">Ludotech</span>
    </footer>
  </body>`
}
 

module.exports = UserBillCheckout