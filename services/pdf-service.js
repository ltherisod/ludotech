const PDFDocument = require("pdfkit")

const buildPDF = (dataCallback, endCallback, data) => {
  const doc = new PDFDocument()
  doc.on("data", dataCallback)
  doc.on("end", endCallback)
  doc.text(data._id)
  doc.end()
}

module.exports = { buildPDF }
