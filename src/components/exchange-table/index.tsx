import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import formatNumber from '@/lib/format-number'
import Pagination from '../pagination'
import { Exchange } from '@/types/exchange.model'
import Sparkline from '../ui/sparkline'
import ExchangeTableItem from './item'
import BaseAsset from './base-asset'

const columHelper = createColumnHelper<Exchange>()

const columns = [
  columHelper.accessor('baseAsset', {
    cell: (info) => (
      <BaseAsset
        base={info.getValue()}
        quoteAsset={info.row.original.quoteAsset}
        assetFullName={info.row.original.assetFullName}
      />
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

interface ExchangeTableProps {
  exchange: Exchange[] | null
  rowCount: number
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
}

export default function ExchangeTable({
  exchange,
  rowCount,
  pagination,
  setPagination
}: ExchangeTableProps) {
  const table = useReactTable({
    data: exchange || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPaginationChange: (page: any) => {
      setPagination({ pageIndex: page.pageIndex, pageSize: page.pageSize })
    }
  })

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
                <ExchangeTableItem key={cell.id} {...cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        activePage={pagination.pageIndex}
        onChange={(page) => setPagination({ ...pagination, pageIndex: page })}
        pageCount={table.getPageCount()}
      />
    </>
  )
}
