import { useEffect, useState } from 'react'

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export interface PaginationProps {
  totalItem: number
  itemPerPage: number
  onPageChange: (page: number) => void
  activePage: number
}
// TODO: Optimize pagination
export function Pagination(props: PaginationProps) {
  const { totalItem, itemPerPage, onPageChange, activePage } = props

  const numOfPages = Math.ceil(totalItem / itemPerPage)
  const [pages, setPages] = useState<Array<number>>([])

  useEffect(() => {
    let pageArray = []
    for (let index = 0; index < numOfPages; index++) {
      pageArray.push(index + 1)
    }

    setPages(pageArray)
  }, [numOfPages])

  // The number of elements for slicing the pagination
  const startingOffset = 5
  const endingOffset = pages.length - 4

  const [slicedPagination, setSlicedPagination] = useState([[0], [0], [0]])

  // if number of post changes but user is still on previous page
  useEffect(() => {
    if (activePage > numOfPages) {
      onPageChange(numOfPages)
    }
  }, [activePage, numOfPages, onPageChange])

  useEffect(() => {
    let startingArrayTemp = pages.slice(0, startingOffset)
    let endingArrayTemp = pages.slice(endingOffset, pages.length)
    let currentArrayTemp: number[] = []

    // if there are only 5 pages, dont produce ending arrays
    if (pages.length <= startingOffset) {
      startingArrayTemp = [...pages]
      endingArrayTemp = []
    }

    // If current page is in starting array or ending array,
    // then no need of miffle section

    if (startingArrayTemp.includes(activePage)) {
      currentArrayTemp = []
      endingArrayTemp =
        endingArrayTemp[endingArrayTemp.length - 1] === undefined
          ? []
          : [endingArrayTemp[endingArrayTemp.length - 1]]
    } else if (endingArrayTemp.includes(activePage)) {
      currentArrayTemp = []
      startingArrayTemp = [startingArrayTemp[0]]
    } else {
      currentArrayTemp = [activePage - 1, activePage, activePage + 1]
      startingArrayTemp = [startingArrayTemp[0]]
      endingArrayTemp = [endingArrayTemp[endingArrayTemp.length - 1]]
    }
    let newSlicedArray = [
      [...startingArrayTemp],
      [...currentArrayTemp],
      [...endingArrayTemp],
    ]
    setSlicedPagination(newSlicedArray)
  }, [pages, startingOffset, activePage, endingOffset])

  return (
    <div className="pagination">
      <div
        className={`pagination-cell ${
          activePage === 1 ? 'pagination-cell--disabled' : ''
        }`}
        onClick={() => {
          onPageChange(activePage - 1 < 1 ? 1 : activePage - 1)
        }}
      >
        <BiChevronLeft />
      </div>

      {slicedPagination.map((sectionedPage, index) => {
        if (sectionedPage.length <= 0) {
          return (
            <>
              {numOfPages > startingOffset && (
                <div className="separator">...</div>
              )}
            </>
          )
        } else {
          return (
            <>
              {index === 1 && sectionedPage.length > 0 && (
                <div className="separator">...</div>
              )}
              <div className="sectionedpagination">
                {sectionedPage.map((pageNumber) => {
                  return (
                    <div
                      key={pageNumber}
                      className={`pagination-cell ${
                        activePage === pageNumber
                          ? 'pagination-cell--active'
                          : ''
                      }`}
                      onClick={() => {
                        onPageChange(pageNumber)
                      }}
                    >
                      {pageNumber}
                    </div>
                  )
                })}
              </div>

              {index === 1 && sectionedPage.length > 0 && (
                <div className="separator">...</div>
              )}
            </>
          )
        }
      })}

      <div
        className={`pagination-cell ${
          activePage === pages.length ? 'pagination-cell--disabled' : ''
        }`}
        onClick={() => {
          onPageChange(
            activePage + 1 > pages.length ? pages.length : activePage + 1,
          )
        }}
      >
        <BiChevronRight />
      </div>
    </div>
  )
}
