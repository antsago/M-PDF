import React, { useCallback, PropsWithChildren, forwardRef, useImperativeHandle } from "react"
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { v4 as uuid } from "uuid"
import { makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { AddSource, DropRef } from '../pdfManager'
import Overlay from "./Overlay"

type Props = PropsWithChildren<{ onLoad: AddSource, className: string }>

type OnDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => Promise<void>

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
}))

const DragAndDrop = forwardRef<DropRef, Props>(({ onLoad, children, className }, ref) => {
  const classes = useStyles()

  const onDrop = useCallback<OnDrop>(async (acceptedFiles) => {
    await Promise.all(acceptedFiles.map(async (file) => {
      onLoad({
        id: uuid(),
        content: await file.arrayBuffer(),
        name: file.name,
      })
    }))
  }, [])

  let { getRootProps, getInputProps, open, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop, 
    noClick: true,
    noKeyboard: true,
    accept: "application/pdf",
  })

  useImperativeHandle(ref, () => ({ open }))

  return (
    <div {...getRootProps()} className={clsx(className, classes.root)}>
      <input {...getInputProps()} />
      <Overlay isActive={isDragActive} isReject={isDragReject} />
      {children}
    </div>
  )
})

export default DragAndDrop
