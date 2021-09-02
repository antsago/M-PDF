import React, { useCallback, useEffect, useRef, useState } from "react"
import {useDropzone} from 'react-dropzone'
import PDF from './PDF'
import { PDFDocument } from 'pdf-lib'

const App = () => {
  const [sourcePdf, setSourcePdf] = useState(null)
  const [destinationPdf, setDestinationPdf] = useState(null)
  const pdfLibDestination = useRef(null)

  useEffect(() => { (async () => {
    pdfLibDestination.current = await PDFDocument.create()
  })() }, [])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setSourcePdf(reader.result)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const insertPage = async () => {
    const destination = pdfLibDestination.current
    const source = await PDFDocument.load(sourcePdf)
    const [existingPage] = await destination.copyPages(source, [0])
    destination.insertPage(0, existingPage)
    setDestinationPdf(await destination.saveAsBase64({ dataUri: true }))
  }

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <h1>Original pdf</h1>
      <PDF file={sourcePdf} />

      <button onClick={insertPage} disabled={!sourcePdf || !pdfLibDestination}>Insert page</button>

      <h1>Destination pdf</h1>
      <PDF file={destinationPdf} />
    </div>
  )
}

export default App
