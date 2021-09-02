import React, { useState } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const PDF = ({ file }: { file: string|ArrayBuffer }) => {
  const [pages, setPages] = useState([])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i + 1));
  }

  if (!file) {
    return null
  }

  return (
    <Document
      file={file}
      onLoadError={(error) => console.log(error)}
      onLoadSuccess={onDocumentLoadSuccess}
      >
      {pages?.map((page) => (
        <Page pageNumber={page} key={page} />
      ))}
    </Document>
  )
}

export default PDF
