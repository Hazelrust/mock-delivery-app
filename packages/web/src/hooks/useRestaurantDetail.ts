import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/api"
import { Restaurant } from "../types/restaurantType"

const useRestaurantDetails = () => {
    const { restaurantId } = useParams()
    // const stableRestaurantIds = useMemo(() => restaurantId, [JSON.stringify(restaurantId)])
    const [restaurant, setRestaurant] = useState<Restaurant>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)    

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get(`/restaurants/${restaurantId}`)
            setRestaurant(response.data)
            setLoading(false)
        } catch (error) {
            setError("Failed to fetch restaurant data")
            setLoading(false)
        }
    }, [restaurantId])
    
    useEffect(() => {
        fetchData()
    }, [fetchData])
    
    return {restaurant , loading , error}
}

export default useRestaurantDetails