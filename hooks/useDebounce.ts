import { useEffect, useState } from 'react'

export const useDebouncedValue = (input: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(input)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [input])

  return debouncedValue
}
