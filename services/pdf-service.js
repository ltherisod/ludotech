const PDFDocument = require("pdfkit")

const buildPDF = (dataCallback, endCallback, data) => {
  const today = new Date()
  const doc = new PDFDocument()
  doc.on("data", dataCallback)
  doc.on("end", endCallback)
  
  // pdf header
  
  doc.fontSize(10).text(`Date: ${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`, {
    align: 'right'
  })
  doc.image('./config/assets/ludotech_rubik.png', {
    fit: [200,60],
    align: 'left',
    valign: 'center'
  })

  doc.fillColor('lightgray').fontSize(17).text('_____________________________________________________', 50, 140, { lineBreak: true })


  // pdf body

  doc.fillColor('black').fontSize(25).text(`Purchase Summary`, 50, 175), {
    align: 'left'
  }
  doc.fillColor('transparent').fontSize(8).text(' ')
  data.articles.map(article => {
    doc.fillColor('black').fontSize(15).text(`${article.quantity}U ${article.name}`  , { align: 'justify' })
    doc.fillColor('black').fontSize(15).text(`${article.hasDiscount ? `$ ${article.price}` : ''} $ ${article.hasDiscount ? article.discountPrice : article.price}`, { align: 'right' })
    doc.fillColor('transparent').fontSize(8).text(' ') 
  })
  doc.fillColor('lightgray').fontSize(17).text('___________________________________________________', { lineBreak: true })
  doc.fillColor('transparent').fontSize(10).text(' ')
  doc.fillColor('black').fontSize(15).text(`Total: $ ${data.total}`, {
    align: 'right'
  })
  doc.fillColor('lightgray').fontSize(17).text('___________________________________________________', { lineBreak: true })
  doc.fillColor('transparent').fontSize(8).text(' ')
  doc.fillColor('black').fontSize(25).text(`Send to:`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`Address: ${data.direction.street}, ${data.direction.number}, ${data.direction.department}`, { 
    align: 'left'
  })
  doc.fillColor('transparent').fontSize(8).text(' ')
  doc.fontSize(12).text(`City/State: ${data.direction.city}, ${data.direction.state}`, { 
    align: 'left'
  })
  doc.fillColor('transparent').fontSize(8).text(' ')
  doc.fontSize(12).text(`ZipCode: ${data.direction.zipCode}`, { 
    align: 'left'
  })
  doc.fillColor('transparent').fontSize(12).text(' ')
  doc.fillColor('gray').fontSize(14).text(`Reciver: ${data.direction.receiver}`, { 
    align: 'left'
  })
  doc.fillColor('lightgray').fontSize(17).text('___________________________________________________', { lineBreak: true })
  doc.fillColor('transparent').fontSize(12).text(' ')
  doc.fillColor('black').fontSize(15).text(`Status:`, { 
    align: 'left'
  })
  doc.fillColor('black').fontSize(15).text(`${data.status}`, { 
    align: 'right'
  })
  doc.fillColor('lightgray').fontSize(17).text('___________________________________________________', { lineBreak: true })
  doc.fillColor('transparent').fontSize(8).text(' ')
  doc.fillColor('black').fontSize(12).text(`Selected payment method: ${data.paymentDetails.method === 'STRIPE' ? 'CREDIT CARD' : 'PAYPAL'}`, { lineBreak: true })
  doc.fillColor('transparent').fontSize(12).text(' ')

  doc.image('./config/assets/pngkey.com-bar-code-png-131088.png', {
    fit: [490,70],
    align: 'center',
    valign: 'center',
    ineBreak: true
  })
  doc.fillColor('transparent').fontSize(5).text(' ')
  doc.fillColor('black').fontSize(12).text(`${data._id}`, { 
    align: 'center'
  })
  // doc.fillColor('black').fontSize(12).text(`${data._id}`, 50, 185, { 
  //   align: 'center'
  // })

  doc.end()
}

module.exports = { buildPDF }
