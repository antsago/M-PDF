import React, { useCallback, useEffect, useRef, useState } from "react"
import { PDFDocument } from 'pdf-lib'
import PDF from './PDF'
import DragAndDrop from './DragAndDrop'

const App = () => {
  const [sourcePdf, setSourcePdf] = useState(null)
  const [destinationPdf, setDestinationPdf] = useState(null)
  const pdfLibDestination = useRef(null)

  useCallback(() => { }, [])
  useEffect(() => { (async () => {
    pdfLibDestination.current = await PDFDocument.create()
  })() }, [])

  const insertPage = async () => {
    const destination = pdfLibDestination.current
    const source = await PDFDocument.load(sourcePdf)
    const [existingPage] = await destination.copyPages(source, [0])
    destination.insertPage(0, existingPage)
    setDestinationPdf(await destination.saveAsBase64({ dataUri: true }))
  }

  return (
    <div>
      <DragAndDrop onLoad={setSourcePdf} />

      <h1>Original pdf</h1>
      <PDF file={sourcePdf} />

      <button onClick={insertPage} disabled={!sourcePdf || !pdfLibDestination}>Insert page</button>

      <h1>Destination pdf</h1>
      <PDF file={destinationPdf} />
    </div>
  )
}

export default App
