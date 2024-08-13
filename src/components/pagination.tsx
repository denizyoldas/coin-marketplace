import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationProps {
  onNextPage: () => void
  onPreviousPage: () => void
}

export default function Pagination({
  onNextPage,
  onPreviousPage
}: PaginationProps) {
  return (
    <BasePagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPreviousPage()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => onNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </BasePagination>
  )
}
