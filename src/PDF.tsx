import React, { useState } from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const PDF = ({ file }) => {
  const [pages, setPages] = useState([])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(Array.from({ length: numPages }, (v, i) => i + 1));
  }

  return (
    <Document
      file={file}
      onLoadError={(error) => console.log(error)}
      onLoadSuccess={onDocumentLoadSuccess}
      >
      {file && pages?.map((page) => (
        <Page pageNumber={page} key={page} />
        ))}
    </Document>
  )
}

export default PDF
