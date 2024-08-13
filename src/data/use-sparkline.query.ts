import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS, API } from '@services'

interface SparklineParams {
  symbol: string
}

const getSparkline = async (params: SparklineParams) => {
  const response = await API.get(ENDPOINTS.Sparkline, {
    params
  })
  return response.data
}

const useSparklineQuery = (params: SparklineParams) => {
  return useQuery<string[], Error>({
    queryKey: ['Sparkline', params],
    queryFn: () => getSparkline(params)
  })
}

export default useSparklineQuery
