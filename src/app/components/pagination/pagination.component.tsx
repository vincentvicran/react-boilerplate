export interface PaginationProps {
  totalItem: number
  itemPerPage: number
  onPageChange: (page: number) => void
  active: number
}
// TODO: Optimize pagination
export function Pagination(props: PaginationProps) {
  const { totalItem, itemPerPage, onPageChange, active } = props

  const numOfPages = Math.ceil(totalItem / itemPerPage)
  const pages: number[] = []
  for (let index = 0; index < numOfPages; index++) {
    pages.push(index + 1)
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <div
          className={`pagination-cell ${
            active === page ? 'pagination-cell--active' : ''
          }`}
          onClick={() => {
            onPageChange(page)
          }}
        >
          {page}
        </div>
      ))}
    </div>
  )
}
