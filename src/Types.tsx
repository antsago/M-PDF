import { MouseEvent } from "react"

export type PDFFile = {
  id: string,
  content: string|ArrayBuffer,
  name: string,
}

export type OnInsert = (page: number, source: PDFFile, event: MouseEvent) => Promise<void>
