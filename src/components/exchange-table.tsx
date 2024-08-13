import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import SymbolImage from './symbol-image'
import formatCurrency from '@/lib/fomrat-currency'
import Pagination from './pagination'
import { Exchange } from '@/types/exchange.model'
import useExchangeQuery from '@/data/use-exchange.query'
import { useEffect, useState } from 'react'
import Sparkline from './ui/sparkline'
import cx from 'classnames'

const columHelper = createColumnHelper<Exchange>()

const columns = [
  columHelper.accessor('baseAsset', {
    cell: (info) => (
      <div className="flex shrink-0 items-center gap-3">
        <SymbolImage symbol={info.getValue().toLowerCase()} />
        <div className="flex flex-grow flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <p className="font-semibold">{info.getValue()}</p>
            <p>/ {info.row.original.quoteAsset}</p>
          </div>
          <span>{info.row.original.assetFullName}</span>
        </div>
      </div>
    ),
    header: 'Crypto',
    size: 600
  }),
  columHelper.accessor('lastPrice', {
    cell: (info) => (
      <p className="flex items-end justify-end gap-1">
        <span>{formatCurrency(info.getValue())}</span>
        <span className="text-sm text-slate-400">
          {info.row.original.quoteAsset}
        </span>
      </p>
    ),
    header: () => <span className="flex justify-end">Price</span>,
    maxSize: 100
  }),
  columHelper.accessor('marketCap', {
    cell: (info) => (
      <p className="flex items-end justify-end gap-1">
        <span>{formatCurrency(info.getValue())}</span>
        <span className="text-sm text-slate-400">
          {info.row.original.quoteAsset}
        </span>
      </p>
    ),
    maxSize: 100,
    header: () => <span className="flex justify-end">Market Value</span>
  }),
  columHelper.accessor('priceChangePercent', {
    cell: (info) => (
      <>
        <span
          className={
            Number(info.getValue()) > 0 ? 'text-green-500' : 'text-red-500'
          }
        >
          {info.getValue()}%
        </span>
      </>
    ),
    header: '24h Change',
    maxSize: 100
  }),
  columHelper.accessor('symbol', {
    cell: (info) => <Sparkline symbol={info.getValue()} />,
    header: '',
    maxSize: 80
  })
]

export default function ExchangeTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10 //default page size
  })
  const [data, setData] = useState<Exchange[] | null>(null)
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null)
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
    if (!exchangeResponse) return

    setData(exchangeResponse.data)

    exchangeResponse.data.map((coin) => {
      const symbol = `${coin.baseAsset.toLowerCase()}${coin.quoteAsset.toLowerCase()}`
      const url = `wss://stream.binance.com:9443/ws/${symbol}@ticker`

      const ws = new WebSocket(url)

      ws.onmessage = (event) => {
        const trade = JSON.parse(event.data)

        console.log(trade)

        coin.lastPrice = trade.c
        coin.priceChangePercent = trade.P

        setData([...exchangeResponse.data])
        setHighlightedRow(coin.baseAsset)
      }

      ws.onclose = () => {
        console.log('ws closed')
      }

      ws.onerror = (error) => {
        console.log('ws error', error)
      }

      return () => {
        ws.close()
      }
    })
  }, [exchangeResponse])

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: exchangeResponse?.rowCount || 0,
    onPaginationChange: setPagination
  })

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-start text-xs text-slate-400"
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cx('p-2 transition-colors duration-75', {
                    'text-slate-500':
                      highlightedRow === cell.row.original.baseAsset &&
                      cell.column.id === 'lastPrice'
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        onNextPage={() => table.nextPage()}
        onPreviousPage={() => table.previousPage()}
      />
    </>
  )
}
