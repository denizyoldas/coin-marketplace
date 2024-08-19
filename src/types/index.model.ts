export interface PaginationResponse<T> {
  status: string
  data: T[]
  rowCount: number
}

export interface WebsocketResponse {
  symbol: string
  lastPrice: string
  priceChangePercent: string
}
