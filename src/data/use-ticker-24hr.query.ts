import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS, API } from '@services'
import { Ticker24h } from '@/types/ticker.model'

const getTicker24h = async () => {
  const response = await API.get(ENDPOINTS.ticker24h)
  return response.data
}

const useTicker24hQuery = () => {
  return useQuery<Ticker24h[], Error>({
    queryKey: ['tickerPrice'],
    queryFn: getTicker24h
  })
}

export default useTicker24hQuery
