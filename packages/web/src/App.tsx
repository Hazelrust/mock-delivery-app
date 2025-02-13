import LazyLoad from "./components/animation/LazyLoad"
import RestaurantCard from "./components/card/RestaurantCard"
import useAllRestaurant from "./hooks/useAllRestaurant"

function App () {

  const mockIds = [567051,227018]
  const { restaurants , loading , error} = useAllRestaurant(mockIds)

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className=" w-full max-w-3xl text-wrap gap-y-8 py-5 p-4 flex flex-col justify-center items-center">
        <h1 className=" font-bold text text-4xl text-cyan-500">Food delivery</h1>
        {loading && <LazyLoad/>}
        {restaurants.map((restaurant,index) => (
          <RestaurantCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
    
  )
}

export default App