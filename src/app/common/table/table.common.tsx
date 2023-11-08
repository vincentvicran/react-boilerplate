import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  TableContainer as MaterialTableContainer,
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHead as MaterialTableHead,
  TableRow as MaterialTableRow,
  Paper as MaterialPaper,
  Pagination as MaterialPagination,
  TableSortLabel,
} from '@mui/material'
import { IoMdListBox } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'

import { Loader } from 'src/app/common'

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
    onDelete?: (item: T, onCloseModalHandler: any) => void
    onView?: (item: T) => void
  }
  loading?: boolean

  pagination?: {
    perPage?: number
    totalCount: number
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
  // TODO: Create actions cells
  return (
    <table className={`data-table ${stripped && 'data-table--stripped'}`}>
      {/* This is table heading */}
      <thead>
        <tr>
          {columns.map((item, i) => {
            if (item.name) {
              return (
                <th
                  style={item?.colStyle}
                  key={i}
                  align={`${i === 1 ? 'left' : 'center'}`}
                >
                  {!item.sortable ? (
                    item.name
                  ) : (
                    <TableSortLabel
                      active={orderBy === item.field}
                      direction={orderBy === item.field ? order : 'asc'}
                      onClick={() => handleRequestSort(item.field)}
                    >
                      {item.name}
                    </TableSortLabel>
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
                    <TableSortLabel
                      active={orderBy === item.field}
                      direction={orderBy === item.field ? order : 'asc'}
                      onClick={() => handleRequestSort(item.field)}
                    >
                      {item.field}
                    </TableSortLabel>
                  )}
                </th>
              )
            }
          })}
          {actions ? <th align="center">Actions</th> : null}
        </tr>
      </thead>{' '}
      {/* Table body starts here */}
      {loading ? (
        <tbody>
          <tr>
            <td
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
              }}
            >
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
                      <td key={i} align={`${i === 1 ? 'left' : 'center'}`}>
                        {col.render(
                          col.field ? item[col.field] : item,
                          item,
                          index,
                        )}
                      </td>
                    )
                  } else {
                    return (
                      <td key={i} align={`${i === 1 ? 'left' : 'center'}`}>
                        {col.field ? item[col.field] : (item as any)}
                      </td>
                    )
                  }
                })}
                {actions ? (
                  // <td align="center" width={50}>
                  //   <HStack gap="$3">
                  //     {actions?.onView && (
                  //       <ToolTip text="View">
                  //         <ActionButton
                  //           onClick={(e) => {
                  //             e.stopPropagation()
                  //             actions?.onView?.(item)
                  //           }}
                  //         >
                  //           <IoMdListBox
                  //             color={
                  //               !!actionIconColor
                  //                 ? actionIconColor
                  //                 : colors.defaultIconColor
                  //             }
                  //             size={22}
                  //           />
                  //         </ActionButton>
                  //       </ToolTip>
                  //     )}

                  //     {actions?.onEdit && (
                  //       <ToolTip text="Edit">
                  //         <ActionButton
                  //           onClick={(e) => {
                  //             e.stopPropagation()
                  //             actions?.onEdit?.(item)
                  //           }}
                  //         >
                  //           <MdEdit
                  //             color={
                  //               !!actionIconColor
                  //                 ? actionIconColor
                  //                 : colors.defaultIconColor
                  //             }
                  //             size={22}
                  //           />
                  //         </ActionButton>
                  //       </ToolTip>
                  //     )}

                  //     {actions?.onDelete && (
                  //       <ToolTip text="Delete">
                  //         {disableActions ? (
                  //           <RiDeleteBin5Fill
                  //             color={
                  //               !!actionIconColor
                  //                 ? actionIconColor
                  //                 : colors.defaultIconColor
                  //             }
                  //             size={22}
                  //           />
                  //         ) : (
                  //           <ConfirmationModal
                  //             label={`Do you want to delete this ${
                  //               item.name
                  //             } ${item.isFile ? 'file' : 'folder'} ?`}
                  //             danger
                  //             cancelLabel="Cancel"
                  //             confirmLabel="Delete"
                  //             onConfirmClick={(onCloseModalHandler) =>
                  //               actions?.onDelete?.(item, onCloseModalHandler)
                  //             }
                  //             displayElement={
                  //               <ActionButton className="action-delete">
                  //                 <RiDeleteBin5Fill
                  //                   color={
                  //                     !!actionIconColor
                  //                       ? actionIconColor
                  //                       : colors.defaultIconColor
                  //                   }
                  //                   size={22}
                  //                 />
                  //               </ActionButton>
                  //             }
                  //           />
                  //         )}
                  //       </ToolTip>
                  //     )}

                  //     {/* {actionsRef.current?.onDelete && (
                  //         <ToolTip text="Delete">
                  //           <Modal
                  //             tdigger={() => (
                  //               <ActionButton className="action-delete">
                  //                 <AiFillDelete size={22} />
                  //               </ActionButton>
                  //             )}
                  //           >
                  //             {(modal) => (
                  //               <VStack gap="$4">
                  //                 <div
                  //                   style={{
                  //                     fontWeight: 'bold'
                  //                   }}
                  //                 >
                  //                   Are you sure you want to delete ?
                  //                 </div>
                  //                 <HStack gap="$2" justify="end">
                  //                   <Button
                  //                     variant="outlined"
                  //                     color="default"
                  //                     onClick={(e) => {
                  //                       e.preventDefault()
                  //                       modal.close()
                  //                     }}
                  //                   >
                  //                     Cancel
                  //                   </Button>
                  //                   <Button
                  //                     color="error"
                  //                     onClick={(e) => {
                  //                       e.preventDefault()
                  //                       actionsRef.current?.onDelete?.(item)
                  //                       modal.close()
                  //                     }}
                  //                   >
                  //                     Delete
                  //                   </Button>
                  //                 </HStack>
                  //               </VStack>
                  //             )}
                  //           </Modal>
                  //         </ToolTip>
                  //       )} */}
                  //   </HStack>
                  // </td>
                  <></>
                ) : null}
              </tr>
            )
          })}
        </tbody>
      ) : disableNoData ? null : (
        <tbody>
          <tr>
            <tr aria-colspan={columns.length + 1}>No data</tr>
          </tr>
        </tbody>
      )}
    </table>
  )

  // return (
  //   <>
  //     <MaterialTableContainer
  //       component={MaterialPaper}
  //       variant="outlined"
  //       style={{
  //         border: '1px solid #e1e1e1',
  //         paddingBottom: disableNoData ? (data.length ? 40 : 0) : 40,
  //       }}
  //     >
  //       <MaterialTable aria-label="customized table">
  //         <thead>
  //           <tr>
  //             {columns.map((item, i) => {
  //               if (item.name) {
  //                 return (
  //                   <th
  //                     style={item?.colStyle}
  //                     key={i}
  //                     align={`${i === 1 ? 'left' : 'center'}`}
  //                   >
  //                     {!item.sortable ? (
  //                       item.name
  //                     ) : (
  //                       <TableSortLabel
  //                         active={orderBy === item.field}
  //                         direction={orderBy === item.field ? order : 'asc'}
  //                         onClick={() => handleRequestSort(item.field)}
  //                       >
  //                         {item.name}
  //                       </TableSortLabel>
  //                     )}
  //                   </th>
  //                 )
  //               } else {
  //                 return (
  //                   <th
  //                     style={item.colStyle}
  //                     key={i}
  //                     align={`${i === 1 ? 'left' : 'center'}`}
  //                   >
  //                     {!item.sortable ? (
  //                       item.field
  //                     ) : (
  //                       <TableSortLabel
  //                         active={orderBy === item.field}
  //                         direction={orderBy === item.field ? order : 'asc'}
  //                         onClick={() => handleRequestSort(item.field)}
  //                       >
  //                         {item.field}
  //                       </TableSortLabel>
  //                     )}
  //                   </th>
  //                 )
  //               }
  //             })}
  //             {actions ? <th align="center">Actions</th> : null}
  //           </tr>
  //         </thead>

  //         {loading ? (
  //           <tbody>
  //             <tr>
  //               <td
  //                 style={{
  //                   display: 'flex',
  //                   justifyContent: 'center',
  //                   alignItems: 'center',
  //                   width: '100%',
  //                   height: '100px',
  //                 }}
  //               >
  //                 <Loader variant="three" color="#0051ff" size={26} />
  //               </td>
  //             </tr>
  //           </tbody>
  //         ) : data?.length > 0 ? (
  //           <tbody>
  //             {visibleRows?.map((item: any, index) => {
  //               return (
  //                 <tr
  //                   key={index}
  //                   className={
  //                     !!selectParams?.multiple?.value?.find(
  //                       (itm) => itm === item[selectParams?.multiple?.key],
  //                     )
  //                       ? 'selected'
  //                       : item[selectParams?.specific?.key] ===
  //                         selectParams?.specific?.value
  //                       ? 'highlighted'
  //                       : ''
  //                   }
  //                 >
  //                   {columns.map((col, i) => {
  //                     if (col.render) {
  //                       return (
  //                         <td key={i} align={`${i === 1 ? 'left' : 'center'}`}>
  //                           {col.render(
  //                             col.field ? item[col.field] : item,
  //                             item,
  //                             index,
  //                           )}
  //                         </td>
  //                       )
  //                     } else {
  //                       return (
  //                         <td key={i} align={`${i === 1 ? 'left' : 'center'}`}>
  //                           {col.field ? item[col.field] : (item as any)}
  //                         </td>
  //                       )
  //                     }
  //                   })}
  //                   {actions ? (
  //                     <td align="center" width={50}>
  //                       <HStack gap="$3">
  //                         {actions?.onView && (
  //                           <ToolTip text="View">
  //                             <ActionButton
  //                               onClick={(e) => {
  //                                 e.stopPropagation()
  //                                 actions?.onView?.(item)
  //                               }}
  //                             >
  //                               <IoMdListBox
  //                                 color={
  //                                   !!actionIconColor
  //                                     ? actionIconColor
  //                                     : colors.defaultIconColor
  //                                 }
  //                                 size={22}
  //                               />
  //                             </ActionButton>
  //                           </ToolTip>
  //                         )}

  //                         {actions?.onEdit && (
  //                           <ToolTip text="Edit">
  //                             <ActionButton
  //                               onClick={(e) => {
  //                                 e.stopPropagation()
  //                                 actions?.onEdit?.(item)
  //                               }}
  //                             >
  //                               <MdEdit
  //                                 color={
  //                                   !!actionIconColor
  //                                     ? actionIconColor
  //                                     : colors.defaultIconColor
  //                                 }
  //                                 size={22}
  //                               />
  //                             </ActionButton>
  //                           </ToolTip>
  //                         )}

  //                         {actions?.onDelete && (
  //                           <ToolTip text="Delete">
  //                             {disableActions ? (
  //                               <RiDeleteBin5Fill
  //                                 color={
  //                                   !!actionIconColor
  //                                     ? actionIconColor
  //                                     : colors.defaultIconColor
  //                                 }
  //                                 size={22}
  //                               />
  //                             ) : (
  //                               <ConfirmationModal
  //                                 label={`Do you want to delete this ${
  //                                   item.name
  //                                 } ${item.isFile ? 'file' : 'folder'} ?`}
  //                                 danger
  //                                 cancelLabel="Cancel"
  //                                 confirmLabel="Delete"
  //                                 onConfirmClick={(onCloseModalHandler) =>
  //                                   actions?.onDelete?.(
  //                                     item,
  //                                     onCloseModalHandler,
  //                                   )
  //                                 }
  //                                 displayElement={
  //                                   <ActionButton className="action-delete">
  //                                     <RiDeleteBin5Fill
  //                                       color={
  //                                         !!actionIconColor
  //                                           ? actionIconColor
  //                                           : colors.defaultIconColor
  //                                       }
  //                                       size={22}
  //                                     />
  //                                   </ActionButton>
  //                                 }
  //                               />
  //                             )}
  //                           </ToolTip>
  //                         )}

  //                         {/* {actionsRef.current?.onDelete && (
  //                           <ToolTip text="Delete">
  //                             <Modal
  //                               tdigger={() => (
  //                                 <ActionButton className="action-delete">
  //                                   <AiFillDelete size={22} />
  //                                 </ActionButton>
  //                               )}
  //                             >
  //                               {(modal) => (
  //                                 <VStack gap="$4">
  //                                   <div
  //                                     style={{
  //                                       fontWeight: 'bold'
  //                                     }}
  //                                   >
  //                                     Are you sure you want to delete ?
  //                                   </div>
  //                                   <HStack gap="$2" justify="end">
  //                                     <Button
  //                                       variant="outlined"
  //                                       color="default"
  //                                       onClick={(e) => {
  //                                         e.preventDefault()
  //                                         modal.close()
  //                                       }}
  //                                     >
  //                                       Cancel
  //                                     </Button>
  //                                     <Button
  //                                       color="error"
  //                                       onClick={(e) => {
  //                                         e.preventDefault()
  //                                         actionsRef.current?.onDelete?.(item)
  //                                         modal.close()
  //                                       }}
  //                                     >
  //                                       Delete
  //                                     </Button>
  //                                   </HStack>
  //                                 </VStack>
  //                               )}
  //                             </Modal>
  //                           </ToolTip>
  //                         )} */}
  //                       </HStack>
  //                     </td>
  //                   ) : null}
  //                 </tr>
  //               )
  //             })}
  //           </tbody>
  //         ) : disableNoData ? null : (
  //           <tbody>
  //             <tr>
  //               <tr aria-colspan={columns.length + 1}>No data</tr>
  //             </tr>
  //           </tbody>
  //         )}
  //       </MaterialTable>
  //     </MaterialTableContainer>

  //     {!loading && data?.length > 0 && pagination && pagination.totalCount ? (
  //       <div style={{ width: '100%', display: 'flex' }}>
  //         <MaterialPagination
  //           style={{
  //             marginLeft: 'auto',
  //             marginTop: 20,
  //             display: 'inline-block',
  //           }}
  //           count={Math.ceil(
  //             pagination.totalCount / (pagination.perPage ?? 10),
  //           )}
  //           boundaryCount={1}
  //           page={page ? Number(page) : 1}
  //           variant="outlined"
  //           shape="rounded"
  //           onChange={(e, page) => {
  //             e.preventDefault()
  //             onChange(page)
  //           }}
  //         />
  //       </div>
  //     ) : null}
  //   </>
  // )
}
