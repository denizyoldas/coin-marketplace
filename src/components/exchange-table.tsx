import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import SymbolImage from './symbol-image'
import useExchangeInfoQuery, {
  ExchangeInfoResponse
} from '@/data/use-exchange-info.query'
import formatCurrency from '@/lib/fomrat-currency'

const columHelper = createColumnHelper<ExchangeInfoResponse>()

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
          <span>{info.row.original.asset?.assetFullName}</span>
        </div>
      </div>
    ),
    header: 'Crypto'
  }),
  columHelper.accessor('ticker.lastPrice', {
    cell: (info) => formatCurrency(info.getValue()),
    header: 'Price'
  }),
  columHelper.accessor('ticker.volume', {
    cell: (info) => formatCurrency(info.getValue()),
    header: 'Market Value'
  }),
  columHelper.accessor('ticker.priceChangePercent', {
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
    header: '24H change'
  }),
  columHelper.accessor('ticker.highPrice', {
    cell: (info) => formatCurrency(info.getValue()),
    header: 'High'
  })
]

export default function ExchangeTable() {
  const { data, isLoading, error } = useExchangeInfoQuery()

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
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
                <th key={header.id} className="text-start text-slate-300">
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </>
  )
}
