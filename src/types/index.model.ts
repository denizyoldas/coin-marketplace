export interface PaginationResponse<T> {
  status: string
  data: T[]
  rowCount: number
}
