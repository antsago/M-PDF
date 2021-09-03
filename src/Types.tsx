import { MouseEvent } from "react"

export type PDFFile = {
  id: string,
  content: string|ArrayBuffer,
  name: string,
}
export type Destination = { sourceId: string, sourcePage: number }[]

export type OnInsert = (page: number, source: PDFFile, event: MouseEvent) => Promise<void>
