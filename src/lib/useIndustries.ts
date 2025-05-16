'use client'

import { useEffect, useState } from 'react'

export const useIndustries = () => {
  const [industries, setIndustries] = useState<string[]>([])

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/data/industry-sector.json')
        const data = await response.json()
        setIndustries(data)
      } catch (error) {
        console.log( error)
      }
    }

    fetchIndustries()
  }, [])

  return industries
}
