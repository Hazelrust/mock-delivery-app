import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/api"
import { FullMenu } from "../types/restaurantType"

const useMenuDetail = (menuName:string) => {
    const { restaurantId } = useParams()
    const [menu, setMenu] = useState<FullMenu>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null >(null)

    const fetchData = useCallback(async () => {
        if(!menuName){
            return
        }
        try {
            const response = await api.get(`/restaurants/${restaurantId}/menus/${menuName}/full.json`)
            setMenu(response.data)
            setLoading(false)
        } catch (error) {
            setError("Failed to fetch full menu data")
            setLoading(false)
        }
    } , [restaurantId,menuName])

    useEffect(() => {
        fetchData()
    }, [fetchData])

  return { menu , loading , error}
}
export default useMenuDetail