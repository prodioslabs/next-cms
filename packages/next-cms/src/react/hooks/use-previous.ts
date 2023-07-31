import { useEffect, useRef } from 'react'

export function usePrevious<T extends any>(newValue: T) {
  const previousRef = useRef<T>()

  useEffect(() => {
    previousRef.current = newValue
  })

  return previousRef.current
}
