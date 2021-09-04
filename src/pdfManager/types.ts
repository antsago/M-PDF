import { MouseEvent } from "react"

export type Source = {
  id: string,
  content: string|ArrayBuffer,
  name: string,
}

export type Destination = { sourceId: string, sourcePage: number }[]
export type InsertPage = (page: number, source: Source, event: MouseEvent) => Promise<void>
export type DownloadDestination = () => Promise<void>

export type PDFContext = {
  sources: Source[],
  addSource: (newSource: Source) => void,
  getSource: (sourceId: string) => Source,
  destination: Destination,
  downloadDestination: DownloadDestination,
  insertPage: InsertPage,
}