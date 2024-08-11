import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Button } from './ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages = new Set<number>()
    const startPages = [1, 2, 3]
    const endPages = [totalPages - 2, totalPages - 1, totalPages]

    // Add start and end pages
    startPages.forEach((page) => pages.add(page))
    endPages.forEach((page) => pages.add(page))

    // Add pages around the current page
    const startPage = Math.max(4, currentPage - 3)
    const endPage = Math.min(totalPages - 3, currentPage + 3)

    for (let i = startPage; i <= endPage; i++) {
      pages.add(i)
    }

    return Array.from(pages).sort((a, b) => a - b)
  }

  const visiblePages = getVisiblePages()

  return (
    <BasePagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
        </PaginationItem>
        {visiblePages.map((page, index) =>
          page === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Button variant="link" onClick={() => onPageChange(page)}>
                {page}
              </Button>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </BasePagination>
  )
}
