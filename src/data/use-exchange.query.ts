import { useQuery } from 'react-query'
import { ENDPOINTS, API } from '@services'
import { Exchange } from '@/types/exchange.model'
import { PaginationResponse } from '@/types/index.model'

interface ExchangeParams {
  quoteSymbol?: string
  page: number
  limit: number
}

const getExchange = async (params: ExchangeParams) => {
  const response = await API.get(ENDPOINTS.Exchange, {
    params
  })
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useExchangeQuery = (params: ExchangeParams, options?: any) => {
  return useQuery<PaginationResponse<Exchange>, Error>(
    ['Exchange', params],
    () => getExchange(params),
    { ...options }
  )
}

export default useExchangeQuery
