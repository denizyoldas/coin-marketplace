// src/Sparkline.tsx
import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

interface SparklineProps {
  openPrice?: string
  highPrice?: string
  lowPrice?: string
  closePrice?: string
}

const Sparkline: React.FC<SparklineProps> = ({
  openPrice,
  highPrice,
  lowPrice,
  closePrice
}) => {
  if (!openPrice || !highPrice || !lowPrice || !closePrice) {
    return null
  }

  const data = [openPrice, highPrice, lowPrice, closePrice].map((price) =>
    parseFloat(price)
  )

  const color = closePrice > openPrice ? 'green' : 'red'

  return (
    <Sparklines data={data}>
      <SparklinesLine color={color} style={{ fill: 'none', strokeWidth: 2 }} />
    </Sparklines>
  )
}

export default Sparkline
