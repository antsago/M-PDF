import React, { useCallback, PropsWithChildren, forwardRef, useImperativeHandle } from "react"
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { v4 as uuid } from "uuid"
import { makeStyles, alpha, Typography } from "@material-ui/core"
import clsx from "clsx"
import { AddSource, DropRef } from '../pdfManager'

type Props = PropsWithChildren<{ onLoad: AddSource, className: string }>

type OnDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => Promise<void>

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
  },
  accept: {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.5),
  },
  reject: {
    backgroundColor: alpha(theme.palette.error.light, 0.75),
  },
  message: {
    fontWeight: "bold",
    fontStyle: "italic",
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
      {isDragActive && (
        <div className={clsx({ [classes.base]: true, [classes.accept]: isDragAccept, [classes.reject]: isDragReject })}>
          <Typography component="p" variant="h5" className={classes.message}>
            {isDragAccept && "Drop pdf files here to upload them as sources"}
            {isDragReject && "Non-pdf files will be ignored"} 
          </Typography>
        </div>
      )}
      {children}
    </div>
  )
})

export default DragAndDrop
