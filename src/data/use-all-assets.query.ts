import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS, API } from '@services'
import { Asset } from '@/types/exchange-info.model'

const getAllAssets = async () => {
  const response = await API.get(ENDPOINTS.allAssets)
  return response.data
}

const useGetAllAssetsQuery = () => {
  return useQuery<Asset[], Error>({
    queryKey: ['getAllAssets'],
    queryFn: getAllAssets
  })
}

export default useGetAllAssetsQuery
