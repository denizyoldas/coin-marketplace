import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import SymbolImage from './symbol-image'
import formatNumber from '@/lib/format-number'
import Pagination from './pagination'
import { Exchange } from '@/types/exchange.model'
import useExchangeQuery from '@/data/use-exchange.query'
import { useEffect, useRef, useState } from 'react'
import Sparkline from './ui/sparkline'
import cx from 'classnames'
import { setupWebSocket } from '@/services'

const columHelper = createColumnHelper<Exchange>()

const columns = [
  columHelper.accessor('baseAsset', {
    cell: (info) => (
      <div className="flex shrink-0 flex-col items-center gap-3 md:flex-row">
        <SymbolImage symbol={info.getValue().toLowerCase()} />
        <div className="flex flex-grow flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <p className="font-semibold">{info.getValue()}</p>
            <p>/ {info.row.original.quoteAsset}</p>
          </div>
          <span className="text-center md:text-start">
            {info.row.original.assetFullName}
          </span>
        </div>
      </div>
    ),
    header: 'Crypto',
    size: 600
  }),
  columHelper.accessor('lastPrice', {
    cell: (info) => (
      <p className="flex items-end justify-end gap-1">
        <span>{formatNumber(info.getValue())}</span>
        <span className="text-sm text-slate-400">
          {info.row.original.quoteAsset}
        </span>
      </p>
    ),
    header: () => <span className="flex justify-end">Price</span>
  }),
  columHelper.accessor('marketCap', {
    cell: (info) => (
      <p className="flex items-end justify-end gap-1">
        <span>{formatNumber(info.getValue())}</span>
        <span className="text-sm text-slate-400">
          {info.row.original.quoteAsset}
        </span>
      </p>
    ),
    header: () => <span className="flex justify-end">Market Value</span>
  }),
  columHelper.accessor('priceChangePercent', {
    cell: (info) => (
      <div className="flex items-center justify-center">
        <span
          className={
            Number(info.getValue()) > 0 ? 'text-green-500' : 'text-red-500'
          }
        >
          {formatNumber(info.getValue())}%
        </span>
      </div>
    ),
    header: () => (
      <span className="flex items-center justify-center">24h Change</span>
    ),
    size: 120
  }),
  columHelper.accessor('symbol', {
    cell: (info) => <Sparkline symbol={info.getValue()} />,
    header: '',
    maxSize: 80
  })
]

export default function ExchangeTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const [data, setData] = useState<Exchange[] | null>(null)
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null)
  const webSockets = useRef<Map<string, WebSocket>>(new Map())
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

    exchangeResponse.data.forEach((coin) => {
      const symbolKey = `${coin.baseAsset}-${coin.quoteAsset}`

      if (!webSockets.current.has(symbolKey)) {
        const ws = setupWebSocket(coin, (updatedCoin) => {
          setData((prevData) =>
            prevData
              ? prevData.map((item) =>
                  item.baseAsset === updatedCoin.baseAsset ? updatedCoin : item
                )
              : []
          )
          setHighlightedRow(updatedCoin.baseAsset)
        })
        webSockets.current.set(symbolKey, ws)
      }
    })

    return () => {
      webSockets.current.forEach((ws) => ws.close())
      webSockets.current.clear()
    }
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
