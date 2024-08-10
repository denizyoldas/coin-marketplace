import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS, API } from '@services'
import {
  Asset,
  ExchangeInfo,
  ExchangeSymbol
} from '@/types/exchange-info.model'
import { Ticker24h } from '@/types/ticker.model'

export interface ExchangeInfoResponse extends ExchangeSymbol {
  asset?: Asset
  ticker?: Ticker24h
}

const getExchangeInfo = async (): Promise<ExchangeInfoResponse[]> => {
  const exchangeInfoResponse = await API.get<ExchangeInfo>(
    ENDPOINTS.exchangeInfo
  )
  const assets = await API.get<Asset[]>(ENDPOINTS.allAssets)
  const ticker24h = await API.get<Ticker24h[]>(ENDPOINTS.ticker24h)

  const data: ExchangeInfoResponse[] = exchangeInfoResponse.data.symbols
    .filter((symbol) => symbol.quoteAsset === 'USDT')
    .map((symbol) => {
      const asset = assets.data.find((a) => a.assetName === symbol.baseAsset)
      const ticker = ticker24h.data.find((t) => t.symbol === symbol.symbol)

      return {
        ...symbol,
        asset,
        ticker
      }
    })

  return data
}

const useExchangeInfoQuery = () => {
  return useQuery<ExchangeInfoResponse[], Error>({
    queryKey: ['exchangeInfo'],
    queryFn: getExchangeInfo
  })
}

export default useExchangeInfoQuery
