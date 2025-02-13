import { Router } from "express";
import { getFullMenu, getMenu, getRestaurant } from "../controllers/restaurantController";

const router = Router()

router.get('/:restaurantId',getRestaurant)
router.get('/:restaurantId/menus/:menuName/short.json',getMenu)
router.get("/:restaurantId/menus/:menuName/full.json", getFullMenu );

export default router


// application.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));

//http://localhost:3001/api/restaurant

// router.post('/', (req,res) => {
//     res.send('Post all restaurant')
// })

// router.put('/',(req,res) => {
//     res.send('Put all restaurant')
// })

// router.delete('/',(req,res) => {
//     res.json({name: 'ร้านยายธา', id:555})
// })