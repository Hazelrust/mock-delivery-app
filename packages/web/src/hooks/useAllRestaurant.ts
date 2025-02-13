import { useCallback, useEffect, useMemo, useState } from "react"
import { Restaurant } from "../types/restaurantType"
import api from "../api/api"

const useAllRestaurant = (mockIds: number[]) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // const stableRestaurantIds = useMemo(() => restaurantIds, [JSON.stringify(restaurantIds)])

  const fetchData = useCallback(async () => {
    try {
      const responses = await Promise.all(
        mockIds.map((id) => api.get(`/restaurants/${id}`))
      )
      setRestaurants(responses.map((response) => response.data))
      setLoading(false)
    } catch (error) {
      setError("Failed to fetch restaurant data")
      setLoading(false)
    }
  }, [mockIds])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { restaurants, loading, error }
}

export default useAllRestaurant