import SymbolImage from '../ui/symbol-image'

interface BaseAssetProps {
  base: string
  quoteAsset: string
  assetFullName: string
}

export default function BaseAsset({
  base,
  quoteAsset,
  assetFullName
}: BaseAssetProps) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-3 md:flex-row">
      <SymbolImage symbol={base.toLowerCase()} />
      <div className="flex flex-grow flex-col gap-1">
        <div className="flex items-center gap-0.5">
          <p className="font-semibold">{base}</p>
          <p>/ {quoteAsset}</p>
        </div>
        <span className="text-center md:text-start">{assetFullName}</span>
      </div>
    </div>
  )
}
