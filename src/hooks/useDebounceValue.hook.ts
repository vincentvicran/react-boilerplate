import React, { useRef } from 'react'

export const useDebounceValue = <T>(value: T, timeout?: number) => {
  const [searchValue, setSearchValue] = React.useState<T>(value)

  const handlerRef = useRef<unknown | number | undefined>()

  React.useEffect(() => {
    handlerRef.current = setTimeout(function () {
      setSearchValue(value)
    }, timeout ?? 500)
    return () => {
      clearTimeout(handlerRef.current as number)
    }
  }, [value, timeout])
  return searchValue
}
