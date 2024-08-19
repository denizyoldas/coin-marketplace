import ExchangeTable from '@/components/exchange-table'
import Loading from '@/components/ui/loading'
import useExchangeQuery from '@/data/use-exchange.query'
import { setupWebSocket } from '@/services'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const {
    data: exchangeResponse,
    isLoading,
    error
  } = useExchangeQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    quoteSymbol: 'USDT'
  })

  useEffect(() => {
    const symbols = exchangeResponse?.data.map((exchange) => exchange.symbol)
    if (!symbols) return
    const websocket = setupWebSocket(symbols, () => {})
    return () => websocket.close()
  }, [exchangeResponse])

  if (isLoading) return <Loading />

  if (error) return <div>Error: {error.message}</div>

  if (!exchangeResponse) return null

  return (
    <ExchangeTable
      exchange={exchangeResponse?.data}
      rowCount={exchangeResponse?.rowCount}
      setPagination={(pagination) => setPagination(pagination)}
      pagination={pagination}
    />
  )
}
