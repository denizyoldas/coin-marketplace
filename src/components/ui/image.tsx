type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {}

export default function Image({ src, ...props }: ImageProps) {
  const url = import.meta.env.VITE_CDN_URL + src

  return <img src={url} {...props} />
}
