import React, { useCallback, useState } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import {useDropzone} from 'react-dropzone'

const App = () => {
  const [pdfFile, setPdfFile] = useState(null)
  const [pages, setPages] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setPdfFile(reader.result)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i + 1));
  }

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <h1>Original pdf</h1>
      <Document
        file={pdfFile}
        onLoadError={(error) => console.log(error)}
        onLoadSuccess={onDocumentLoadSuccess}
        >
        {pdfFile && pages?.map((page) => (
          <Page pageNumber={page} key={page} />
          ))}
      </Document>
    </div>
  )
}

export default App
