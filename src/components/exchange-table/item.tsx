import { Exchange } from '@/types/exchange.model'
import { Cell, flexRender } from '@tanstack/react-table'
import cx from 'classnames'

type ExchangeTableItemProps = Cell<Exchange, unknown> & {
  isLive?: boolean
}

export default function ExchangeTableItem(props: ExchangeTableItemProps) {
  return (
    <td
      className={cx('p-2 transition-colors duration-75', {
        // 'text-slate-500':
        //   highlightedRow === props.row.original.baseAsset &&
        //   props.column.id === 'lastPrice'
      })}
    >
      {flexRender(props.column.columnDef.cell, props.getContext())}
    </td>
  )
}
