export interface ExchangeInfo {
  timezone: string
  serverTime: number
  rateLimits: RateLimit[]
  exchangeFilters: ExchangeFilter[]
  symbols: ExchangeSymbol[]
}

export interface RateLimit {
  rateLimitType: string
  interval: string
  limit: number
}

export interface ExchangeFilter {
  filterType: string
  minPrice?: string
  maxPrice?: string
  tickSize?: string
  multiplierUp?: string
  multiplierDown?: string
  avgPriceMins?: number
  minQty?: string
  maxQty?: string
  stepSize?: string
  minNotional?: string
  applyToMarket?: boolean
  maxNumAlgoOrders?: number
  maxNumIcebergOrders?: number
  maxPosition?: number
}

export interface ExchangeSymbol {
  symbol: string
  status: string
  baseAsset: string
  baseAssetPrecision: number
  quoteAsset: string
  quotePrecision: number
  quoteAssetPrecision: number
  baseCommissionPrecision: number
  quoteCommissionPrecision: number
  orderTypes: string[]
  icebergAllowed: boolean
  ocoAllowed: boolean
  quoteOrderQtyMarketAllowed: boolean
  isSpotTradingAllowed: boolean
  isMarginTradingAllowed: boolean
  filters: ExchangeFilter[]
  permissions: string[]
}

export interface EnhancedMarketData extends ExchangeSymbol {
  baseAssetFullName?: string
  quoteAssetFullName?: string
}

export interface Asset {
  assetFullName: string
  assetName: string
  isBorrowable: boolean
  isMortgageable: boolean
  userMinBorrow: string
  userMinRepay: string
}
