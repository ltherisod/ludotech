const PDFDocument = require("pdfkit")

const buildPDF = (dataCallback, endCallback, data) => {
  const today = new Date()
  console.log(data)
  const doc = new PDFDocument()
  doc.on("data", dataCallback)
  doc.on("end", endCallback)
  
  // pdf header
  doc.fontSize(10).text(`Date: ${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`, {
    align: 'right'
  })
  doc.fontSize(28).text(`Ludotech`, {
    align: 'left'
  })
  doc.text('')
  // pdf body
  
  doc.fontSize(25).text(`Purchase Summary`, {
    align: 'left'
  })
  // // va una linea aca
  data.articles.map(article => {
    doc.fontSize(15).text(`${article.name}  x ${article.quantity}U  ${article.hasDiscount ? article.price : ''}   ${article.hasDiscount ? article.discountPrice : article.price}` , {
      align: 'justify'
    })
  })
  // va una linea delgada
  doc.fontSize(15).text(`Total: ${data.total}`, {
    align: 'left'
  })
  // va una linea 
  doc.fontSize(25).text(`Send to:`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`Street: ${data.direction.street}  Nº: ${data.direction.number} Department: ${data.direction.department}`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`City: ${data.direction.city}  State: ${data.direction.state} Zip code: ${data.direction.zipCode}`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`Reciver: ${data.direction.receiver}`, { 
    align: 'left'
  })
  // va una linea 
  doc.fontSize(15).text(`Status: ${data.status}`, { 
    align: 'left'
  })
  // va una linea
  doc.fontSize(12).text(`Selected payment method: ${data.paymentDetails.method}`, { 
    align: 'left'
  })
  // va codigo de barras
  doc.fontSize(12).text(`${data._id}`, { 
    align: 'left'
  })







  doc.end()
}

module.exports = { buildPDF }
