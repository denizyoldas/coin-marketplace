import ReactPaginate from 'react-paginate'

interface PaginationProps {
  onChange: (page: number) => void
  pageCount: number
  activePage: number
}

export default function Pagination({
  onChange,
  pageCount,
  activePage
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      containerClassName="flex gap-2 justify-center"
      activeClassName="font-semibold"
      onPageChange={(page) => onChange(page.selected)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      initialPage={activePage}
    />
  )
}
