import React, { useCallback, PropsWithChildren, forwardRef, useImperativeHandle } from "react"
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { v4 as uuid } from "uuid"
import { AddSource, DropRef } from '../pdfManager'

type Props = PropsWithChildren<{ onLoad: AddSource, className: string }>

type OnDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => Promise<void>

const DragAndDrop = forwardRef<DropRef, Props>(({ onLoad, children, className }, ref) => {
  const onDrop = useCallback<OnDrop>(async (acceptedFiles) => {
    await Promise.all(acceptedFiles.map(async (file) => {
      onLoad({
        id: uuid(),
        content: await file.arrayBuffer(),
        name: file.name,
      })
    }))
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop, 
    noClick: true,
    noKeyboard: true,
    accept: ".pdf",
  })

  useImperativeHandle(ref, () => ({ open }))

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
})

export default DragAndDrop
