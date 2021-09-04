import React, { useCallback, PropsWithChildren } from "react"
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { v4 as uuid } from "uuid"
import { PDFFile } from './pdfManager'

type Props = PropsWithChildren<{ onLoad: (pdfFile: PDFFile) => void, className: string }>

type OnDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => Promise<void>

const DragAndDrop = ({ onLoad, children, className }: Props) => {
  const onDrop = useCallback<OnDrop>(async (acceptedFiles) => {
    await Promise.all(acceptedFiles.map(async (file) => {
      onLoad({
        id: uuid(),
        content: await file.arrayBuffer(),
        name: file.name,
      })
    }))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

export default DragAndDrop
