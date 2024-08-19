export interface PaginationResponse<T> {
  status: string
  data: T[]
  rowCount: number
}

export interface SymbolModel {
  code: string
  lastPrice: string
  priceChangePercent: string
  eventTime: number
}
