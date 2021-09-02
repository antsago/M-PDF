import React, { useCallback } from "react"
import { useDropzone } from 'react-dropzone'

const DragAndDrop = ({ onLoad }: { onLoad: (pdf: string | ArrayBuffer) => void}) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => { onLoad(reader.result) }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default DragAndDrop
