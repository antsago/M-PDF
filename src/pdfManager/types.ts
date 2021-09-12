import { RefObject } from "react"

export type TriggerUpload = () => void
export type DropRef = { open: TriggerUpload }

export type Source = {
  id: string,
  content: string|ArrayBuffer,
  name: string,
}
export type AddSource = (newSource: Source) => void
export type GetSource = (sourceId: string) => Source

export type Destination = { sourceId: string, sourcePage: number }[]
export type InsertPage = (page: number, source: Source, insertIndex?: number) => Promise<void>
export type DeletePage = (pageIndex: number) => void
export type DownloadDestination = () => Promise<void>

export type PDFContext = {
  dropRef: RefObject<DropRef>,
  triggerUpload: TriggerUpload,
  sources: Source[],
  addSource: AddSource,
  getSource: GetSource,
  destination: Destination,
  downloadDestination: DownloadDestination,
  insertPage: InsertPage,
  deletePage: DeletePage,
}