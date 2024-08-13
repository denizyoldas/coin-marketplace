interface SymbolImageProps {
  symbol: string
}

export default function SymbolImage({ symbol }: SymbolImageProps) {
  const url = import.meta.env.VITE_CDN_URL + symbol.toLowerCase() + '.svg'
  return (
    <img
      src={url}
      alt={symbol}
      className="h-8 w-8 rounded-full"
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/32'
      }}
    />
  )
}
