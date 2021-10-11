module.exports = (billBody) => {
  const today = new Date()

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body style="margin: 0;padding: 0;box-sizing: border-box;">
      <div style="width:80vw;margin:0 auto;">
        <!-- encabezado: logo y fecha -->
        <div style="width:80%;height:30vh;display:flex;justify-content:space-between;align-items:flex-start;padding-top:10vh;margin:0 auto;background-color:lightblue">
          <div style="width:20vw;height:20vh;background-image:url();background-position:top;background-size:cover;background-repeat:no-repeat"></div>
          <div style="">${today}</div>
        </div>
        <!-- datos de factura -->
        <div style="width:80%;margin:0 auto;background-color:lightgray;display:flex;justify-content:space-between">
          <div style="">
            <p>Dear: (nombre del usuario que compro)</p>
          </div>
          <div style="">
            <p>Recip number: (numero de la factura)</p>
          </div>
        </div>
        <!-- tabla con detalles -->
        <div style="width:80%;height:50vh;margin:0 auto;background-color:lightyellow;">
          <table style="width:80%; margin:0 auto;">
            <tr style="border:1px solid black;text-align: center;">
              <th>Product</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>juego</td>
              <td>1</td>
              <td>$ 0</td>
              <td>$ 25</td>
            </tr>
            <tr>
              <td cols=3 >Total</td>
              <td>$ 25</td>
            </tr>
          </table>
        </div>
        <div style="">
        </div>
      </div>
    </body>
    </html>`
}