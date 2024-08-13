import useSparklineQuery from '@/data/use-sparkline.query'
import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

interface SparklineProps {
  symbol: string
}

const Sparkline: React.FC<SparklineProps> = ({ symbol }) => {
  const { data } = useSparklineQuery({
    symbol
  })

  if (!data) {
    return false
  }

  const newData = data.map((price) => parseFloat(price))

  const color = newData[newData.length - 1] > newData[0] ? 'green' : 'red'

  return (
    <Sparklines data={newData}>
      <SparklinesLine color={color} style={{ fill: 'none', strokeWidth: 2 }} />
    </Sparklines>
  )
}

export default Sparkline
