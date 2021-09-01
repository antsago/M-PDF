import React, { useCallback, useState } from "react"
import {useDropzone} from 'react-dropzone'
import PDF from './PDF'

const App = () => {
  const [pdfFile, setPdfFile] = useState(null)

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

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <h1>Original pdf</h1>
      <PDF file={pdfFile} />
    </div>
  )
}

export default App
