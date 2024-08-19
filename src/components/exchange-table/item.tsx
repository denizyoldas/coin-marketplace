import { setupWebSocket } from '@/services'
import { Exchange } from '@/types/exchange.model'
import { Cell, flexRender } from '@tanstack/react-table'
import cx from 'classnames'
import { useState } from 'react'

type ExchangeTableItemProps = Cell<Exchange, unknown> & {
  isLive?: boolean
}

export default function ExchangeTableItem(props: ExchangeTableItemProps) {
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null)
  const [webSockets, setWebSockets] = useState<WebSocket | null>(null)

  if (props.isLive) {
    if (!webSockets) {
      const webSocket = setupWebSocket(props.row.original, (updatedCoin) => {
        props.row.original = updatedCoin
        setHighlightedRow(updatedCoin.baseAsset)
      })

      setWebSockets(webSocket)
    }
  }

  return (
    <td
      className={cx('p-2 transition-colors duration-75', {
        'text-slate-500':
          highlightedRow === props.row.original.baseAsset &&
          props.column.id === 'lastPrice'
      })}
    >
      {flexRender(props.column.columnDef.cell, props.getContext())}
    </td>
  )
}
