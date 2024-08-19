import ExchangeTable from '@/components/exchange-table'
import Loading from '@/components/ui/loading'
import useExchangeQuery from '@/data/use-exchange.query'
import { setupWebSocket } from '@/services'
import { Exchange } from '@/types/exchange.model'
import { PaginationResponse } from '@/types/index.model'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [data, setData] = useState<Exchange[]>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const {
    data: exchangeResponse,
    isLoading,
    error
  } = useExchangeQuery(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      quoteSymbol: 'USDT'
    },
    {
      onSuccess: (data: PaginationResponse<Exchange>) => {
        if (data.data) setData(data.data)
      }
    }
  )

  useEffect(() => {
    const symbols = exchangeResponse?.data.map((exchange) => exchange.symbol)
    if (!symbols) return
    const websocket = setupWebSocket(symbols, (updateData) => {
      setData((prev) => {
        const newData = [...prev]
        const index = newData.findIndex(
          (item) => item.symbol === updateData.code
        )
        if (index !== -1) {
          newData[index].lastPrice = updateData.lastPrice
          newData[index].priceChangePercent = updateData.priceChangePercent
          newData[index].eventTime = updateData.eventTime
        }
        return newData
      })
    })

    return () => websocket.close()
  }, [exchangeResponse])

  if (isLoading) return <Loading />

  if (error) return <div>Error: {error.message}</div>

  if (!exchangeResponse) return null

  return (
    <ExchangeTable
      exchange={data}
      rowCount={exchangeResponse?.rowCount}
      setPagination={(pagination) => setPagination(pagination)}
      pagination={pagination}
    />
  )
}
