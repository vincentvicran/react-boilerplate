import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MdEdit, MdViewAgenda } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'

import { Loader, Tooltip } from 'src/app/common'
import { Pagination } from 'src/app/components'

import { getParsedQuery } from 'src/helpers'
import { useQuery } from 'src/hooks'

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function descendingComparator<T>(a: T, b: T, orderBy?: keyof T) {
  if (orderBy) {
    if (typeof a[orderBy] === 'string') {
      // @ts-ignore
      const initial = a[orderBy]?.toLowerCase()
      // @ts-ignore
      const eventual = b[orderBy]?.toLowerCase()

      if (eventual < initial) {
        return -1
      }
      if (eventual > initial) {
        return 1
      }
    } else if (typeof a[orderBy] === 'number') {
      if (a[orderBy] < b[orderBy]) {
        return -1
      }

      if (a[orderBy] > b[orderBy]) {
        return 1
      }
    }
  }
  return 0
}

function getComparator<T, Key extends Extract<keyof T, string>>(
  order: 'asc' | 'desc',
  orderBy?: Key,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator<T>(a, b, orderBy)
    : (a, b) => -descendingComparator<T>(a, b, orderBy)
}

export const Table = <T, K extends Extract<keyof T, string>>({
  columns,
  data = [],
  actions,
  loading = false,
  pagination,
  selectParams,
  disableNoData,
  onPageChange,
  stripped,
  actionIconColor,
  disableActions = false,
}: {
  selectParams?: {
    specific: {
      key: K
      value: any
    }
    multiple: {
      key: K
      value: Array<any>
    }
  }
  stripped?: boolean
  columns: Array<{
    field: K
    name: string | any
    colStyle?: React.CSSProperties
    sortable?: boolean
    render?: (value: any, item: T, index?: number) => React.ReactNode
  }>
  data: Array<T>
  actions?: {
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    onView?: (item: T) => void
  }
  loading?: boolean

  pagination?: {
    perPage?: number
  }
  disableNoData?: boolean
  onPageChange?: (page: number) => void
  actionIconColor?: string
  disableActions?: boolean
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery()

  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState<K | undefined>()
  const handleRequestSort = (property: K) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const page = query?.page ?? 1

  const onChange = useCallback(
    (newPageNumber: number) => {
      const queryy = { ...query }
      queryy.page = newPageNumber
      navigate(location.pathname + `${getParsedQuery(queryy)}`)
      onPageChange?.(newPageNumber)
    },
    [location.pathname, navigate, onPageChange, query],
  )

  const visibleRows = React.useMemo(
    () =>
      !!orderBy
        ? stableSort(data, getComparator<T, K>(order, orderBy))?.slice(
            (pagination?.perPage ?? 20) * (page - 1),
            (pagination?.perPage ?? 20) * (page - 1) +
              (pagination?.perPage ?? 20),
          )
        : data?.slice(
            (pagination?.perPage ?? 20) * (page - 1),
            (pagination?.perPage ?? 20) * (page - 1) +
              (pagination?.perPage ?? 20),
          ),
    [data, order, orderBy, page, pagination],
  )

  const handlePageChange = (newPage: number) => {
    onChange(newPage)
  }

  // TODO: Create pagination and action modal

  return (
    <div>
      <table className={`data-table ${stripped && 'data-table--stripped'}`}>
        {/* This is table heading */}
        <thead>
          <tr>
            {columns.map((item, i) => {
              if (item.name) {
                return (
                  <th style={item?.colStyle} key={i} align="center">
                    {!item.sortable ? (
                      item.name
                    ) : (
                      <div onClick={() => handleRequestSort(item.field)}>
                        {item.name}
                      </div>
                    )}
                  </th>
                )
              } else {
                return (
                  <th
                    style={item.colStyle}
                    key={i}
                    align={`${i === 1 ? 'left' : 'center'}`}
                  >
                    {!item.sortable ? (
                      item.field
                    ) : (
                      <div onClick={() => handleRequestSort(item.field)}>
                        {item.field}
                      </div>
                    )}
                  </th>
                )
              }
            })}
            {actions ? (
              <th align="center" colSpan={Object.keys(actions).length}>
                Actions
              </th>
            ) : null}
          </tr>
        </thead>{' '}
        {/* Table body starts here */}
        {loading ? (
          <tbody>
            <tr>
              <td>
                <Loader variant="three" color="#0051ff" size={26} />
              </td>
            </tr>
          </tbody>
        ) : data?.length > 0 ? (
          <tbody>
            {visibleRows?.map((item: any, index) => {
              return (
                <tr
                  key={index}
                  className={
                    !!selectParams?.multiple?.value?.find(
                      (itm) => itm === item[selectParams?.multiple?.key],
                    )
                      ? 'selected'
                      : item[selectParams?.specific?.key] ===
                        selectParams?.specific?.value
                      ? 'highlighted'
                      : ''
                  }
                >
                  {columns.map((col, i) => {
                    if (col.render) {
                      return (
                        <td key={i}>
                          {col.render(
                            col.field ? item[col.field] : item,
                            item,
                            index,
                          )}
                        </td>
                      )
                    } else {
                      return (
                        <td key={i}>
                          {col.field ? item[col.field] : (item as any)}
                        </td>
                      )
                    }
                  })}

                  {actions?.onEdit && (
                    <td>
                      <Tooltip
                        position="left"
                        showArrow={true}
                        title="Edit Item"
                      >
                        <div
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            actions?.onEdit?.(item)
                          }}
                        >
                          <MdEdit size={22} />
                        </div>
                      </Tooltip>
                    </td>
                  )}

                  {actions?.onDelete && (
                    <td>
                      <Tooltip title="Delete Item">
                        <div
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            actions?.onDelete?.(item)
                          }}
                        >
                          <RiDeleteBin5Fill size={22} />
                        </div>
                      </Tooltip>
                    </td>
                  )}

                  {actions?.onView && (
                    <td>
                      <Tooltip title="View Item">
                        <div
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation()
                            actions?.onView?.(item)
                          }}
                        >
                          <MdViewAgenda size={22} />
                        </div>
                      </Tooltip>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        ) : disableNoData ? null : (
          <tbody>
            <tr>
              <td aria-colspan={columns.length + 1}>No data</td>
            </tr>
          </tbody>
        )}
      </table>
      {!loading && data?.length > 0 && pagination ? (
        <div className="table-pagination">
          <Pagination
            totalItem={data.length}
            itemPerPage={pagination?.perPage ?? 10}
            onPageChange={handlePageChange}
            activePage={Number(page)}
          />
        </div>
      ) : null}
    </div>
  )
}
