import { Link } from "react-router-dom";
import { Restaurant } from "../../types/restaurantType";
import { isDuringTimePeriod } from "../../utils/action";
import { JSX } from "react";

const RestaurantCard = (props: Restaurant): JSX.Element => {

  const renderIsOpen = () => {
    const isOpen =
      props.activeTimePeriod &&
      isDuringTimePeriod(
        props.activeTimePeriod.open,
        props.activeTimePeriod.close
      )
        return (
          <div
            className={`w-20 h-8 text-white rounded-xl flex items-center justify-center ${
              isOpen ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isOpen ? "เปิด" : "ปิด"}
          </div>
        )
  };

  return (
      <Link
        to={`/${props.id}/`}
        className=" w-full flex gap-x-5 p-1 border border-gray-200 rounded-2xl hover:bg-gray-100 shadow-xl"
      >
        <img
          src={props.coverImage}
          alt={props.name}
          className="w-40 h-40 sm:w-60 rounded-2xl object-cover object-center"
          id="restaurant-cover"
        />
        <div className="flex flex-col py-2 gap-y-3">
          <h2 className=" font-bold text-xl">{props.name}</h2>
          {renderIsOpen()}
          <h3>{props.activeTimePeriod.open}-{props.activeTimePeriod.close}</h3>
        </div>
      </Link>
  );
};
export default RestaurantCard;
