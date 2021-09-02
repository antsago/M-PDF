import React, { useCallback, PropsWithChildren } from "react"
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { PDFContent } from './Types'

type Props = PropsWithChildren<{ onLoad: (content: PDFContent, name: string) => void, className: string }>

type OnDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => Promise<void>

const DragAndDrop = ({ onLoad, children, className }: Props) => {
  const onDrop = useCallback<OnDrop>(async (acceptedFiles) => {
    await Promise.all(acceptedFiles.map(async (file) => onLoad(await file.arrayBuffer(), file.name)))
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
