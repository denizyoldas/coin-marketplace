import { Exchange } from '@/types/exchange.model'
import { Cell, flexRender } from '@tanstack/react-table'
import cx from 'classnames'

const COLUMN_IDS = ['lastPrice', 'priceChangePercent']

type ExchangeTableItemProps = Cell<Exchange, unknown> & {}

export default function ExchangeTableItem(props: ExchangeTableItemProps) {
  return (
    <td
      key={props.row.original.baseAsset + props.row.original?.eventTime}
      className={cx('p-2', {
        flash:
          COLUMN_IDS.includes(props.column.id) && props.row.original?.eventTime
      })}
    >
      {flexRender(props.column.columnDef.cell, props.getContext())}
    </td>
  )
}
