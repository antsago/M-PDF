import { RefObject } from "react"

export type TriggerUpload = () => void
export type DropRef = { open: TriggerUpload }

export type Source = {
  id: string,
  content: string|ArrayBuffer,
  name: string,
}
export type DestinationPage = { sourceId: string, sourcePage: number, id: string }
export type PageSeed = Omit<DestinationPage, "id">
export type Page = DestinationPage | PageSeed

export type AddSource = (newSource: Source) => void
export type GetSource = (sourceId: string) => Source

export type Destination = DestinationPage[]
export type CreatePage = (seed: PageSeed) => DestinationPage
export type InsertPage = (page: Page, insertIndex?: number) => Promise<void>
export type DeletePage = (pageId: string) => void
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