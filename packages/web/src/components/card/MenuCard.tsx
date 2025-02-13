import { JSX, useState } from "react";
import useMenuDetail from "../../hooks/useMenuDetail";
import { ShortMenu } from "../../types/restaurantType";
import flameIcon from '../../icon/flame-icon.svg'
import { isDuringTimePeriod } from "../../utils/action";
import FullMenuModal from "../modals/FullMenuModal";

const MenuCard = (props: ShortMenu): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  const { menu, loading, error } = useMenuDetail(props.name)

  const renderModal = () => {
    if (openModal && menu) {
      return (
        <FullMenuModal
          menu={menu}
          loading={false}
          onClose={() => setOpenModal(false)}
        />
      )
    }
  }

  const isBestSeller = () =>
    props.totalInStock - props.sold < 100 ? (
      <div className="absolute -top-4 -right-4">
        <img src={flameIcon} alt="hot sale" className=" xl:w-10 w-8" />
      </div>
    ) : null;
  
    const isSoldOut = () => (
      <div className={`font-semibold text-lg ${props.totalInStock - props.sold < 1 ? "text-gray-500" : "text-black"}`}>
        {props.totalInStock - props.sold < 1 ? `${props.name} (หมด)` : props.name}
      </div>
    );
    
  
  const isDiscount = () =>
    props.discountedTimeperiod &&
    isDuringTimePeriod(
      props.discountedTimeperiod.begin,
      props.discountedTimeperiod.end
    ) ? (
      <div className="flex gap-x-2 flex-wrap">
        <div className="line-through text-neutral-500">฿{props.fullPrice}</div>
        <div>
          ฿{(props.fullPrice * (1 - props.discountedPercent / 100)).toFixed(2)}{" "}
        </div>
      </div>
    ) : (
      <div>฿{props.fullPrice}</div>
    );
  
  return (
    <div
      className="w-full flex gap-x-3 border rounded-2xl border-gray-300 hover:bg-gray-100 shadow-lg"
      role="button"
      onClick={() => setOpenModal(true)}
    >
      {renderModal()}
      <div className="relative">
        <div className="rounded-l-xl overflow-hidden">
        {isBestSeller()}
        <img
          src={props.thumbnailImage}
          alt='menu'
          className="min-w-24 min-h-24 object-cover object-center"
        />
        </div>

      </div>
      <div className="flex flex-col py-1 gap-2 px-2">
        {isSoldOut()}
        {isDiscount()}
      </div>
    </div>
  )
}
export default MenuCard;