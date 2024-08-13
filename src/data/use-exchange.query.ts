import { useQuery } from '@tanstack/react-query'
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

const useExchangeQuery = (params: ExchangeParams) => {
  return useQuery<PaginationResponse<Exchange>, Error>({
    queryKey: ['Exchange', params],
    queryFn: () => getExchange(params)
  })
}

export default useExchangeQuery
