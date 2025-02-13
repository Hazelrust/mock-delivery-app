import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { IoIosArrowBack } from "react-icons/io";
import { isDuringTimePeriod } from "../utils/action";
import useRestaurantDetails from "../hooks/useRestaurantDetail";
import useAllShortMenus from "../hooks/useFetchMenu";
import MenuCard from "../components/card/MenuCard";
import LazyLoad from "../components/animation/LazyLoad";

const RestaurantPage = () => {
    const { ref, inView } = useInView();
    const { menus, loading, error, loadMoreMenus, hasFetchedAll } =
      useAllShortMenus();
    const {
      restaurant,
      loading: restaurantLoading,
      error: restaurantError
    } = useRestaurantDetails();
  
    useEffect(() => {
      if (inView && !hasFetchedAll) {
        const delay = 500;
  
        const timeout = setTimeout(() => {
          loadMoreMenus();
        }, delay)
  
        return () => clearTimeout(timeout);
      }
    }, [inView, loading])
  
    const renderIsOpen = () => {
      const isOpen =
        restaurant?.activeTimePeriod &&
        isDuringTimePeriod(
          restaurant.activeTimePeriod.open,
          restaurant.activeTimePeriod.close
        )
  
      return (
        <div
          className={`w-24 h-8 text-white rounded-xl flex items-center justify-center ${
            isOpen ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isOpen ? "เปิด" : "ปิด"}
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-y-5 items-center ">
        <Link
          to="/"
          className="flex items-center justify-center left-6  top-6 xl:left-12 xl:top-12 bg-cyan-500 p-1 fixed z-10
          text-white rounded-full hover:bg-cyan-400"
        >
          <IoIosArrowBack className="w-6 h-6" />
        </Link>
  
        <img
          src={restaurant?.coverImage}
          alt="restaurant image"
          className="max-h-[50vh] w-full object-cover object-center"
        />
  
        <div className="pb-12 max-w-xl w-full flex flex-col justify-center items-center">
          {restaurant && (
            <div className="w-full flex flex-col gap-y-10 p-3">
              <div className="flex gap-x-5 items-center flex-wrap gap-y-3">
                <h1 className="font-extrabold text-4xl">{restaurant?.name}</h1>
                {renderIsOpen()}
              </div>
  
              <div className="flex flex-col gap-y-6">
                {menus.map((menu, index) => (
                    <MenuCard key={index} {...menu} />
                ))}
              </div>
            </div>
          )}
  
          <div ref={ref}>{((inView) || loading) && <LazyLoad/>}</div>
        </div>
      </div>
    );
  };
  
  export default RestaurantPage;
  
