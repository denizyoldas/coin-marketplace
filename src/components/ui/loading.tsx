import ReactLoading from 'react-loading'

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ReactLoading type="spin" color="blue" height={200} />
    </div>
  )
}
