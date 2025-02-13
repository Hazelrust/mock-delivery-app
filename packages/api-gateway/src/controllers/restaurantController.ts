import { Request, Response } from "express"
import { fetchFullMenu, fetchMenu, fetchRestaurant } from "../fetch/restaurantData"

export const getRestaurant = async (req:Request, res:Response) => {
    try {
        const { restaurantId } = req.params
        const data = await fetchRestaurant(restaurantId)
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch restaurant data"})
    }
}

export const getMenu = async (req:Request, res:Response) => {
    try {
        const { restaurantId, menuName} = req.params 

        // console.log(`Fetching menu for restaurantId: ${restaurantId}, menuName: ${menuName}`)

        const data = await fetchMenu(restaurantId,menuName)
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch menu data from restaurant"})
    }
}

export const getFullMenu = async (req:Request, res:Response) => {
    try {
        const { restaurantId, menuName} = req.params 
        
        // console.log(`Fetching menu for restaurantId: ${restaurantId}, menuName: ${menuName}`)

        const data = await fetchFullMenu(restaurantId,menuName)
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch menu data from restaurant"})
    }
}