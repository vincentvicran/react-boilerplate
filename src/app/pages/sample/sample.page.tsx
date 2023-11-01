import { Collapse, Loader, Skeleton } from 'src/app/common'

export const Sample = () => {
  return (
    <div>
      Sample Page
      <Loader />
      <Collapse content={'hello'} title="hello" />
      <Skeleton />
    </div>
  )
}
