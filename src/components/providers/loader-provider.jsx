'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const LoaderContext = createContext(undefined)

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulasi delay loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 detik

    return () => clearTimeout(timer)
  }, [])

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}
