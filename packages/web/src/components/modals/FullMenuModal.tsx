import { JSX, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { isDuringTimePeriod } from "../../utils/action";
import { FullMenuModalProps } from "../../types/restaurantType";
import OptionButton from "../inputs/OptionButton";

const FullMenuModal = (props: FullMenuModalProps): JSX.Element => {
  const [isClosing, setIsClosing] = useState(false);
  const menu = props.menu;
  const isSoldOut = menu.totalInStock - menu.sold < 1;
  const isDiscounted = () => {
    if (
      menu.discountedTimeperiod &&
      isDuringTimePeriod(
        menu.discountedTimeperiod.begin,
        menu.discountedTimeperiod.end
      )
    ) {
      return (
        <div className="flex flex-wrap gap-x-2 ">
          <div className="line-through text-neutral-400">
            ฿{menu.fullPrice}
          </div>
          <div>
            ฿{menu.fullPrice * (1 - menu.discountedPercent / 100)}
          </div>
        </div>
      );
    }
    return <div>฿{menu.fullPrice}</div>;
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      props.onClose();
    }, 300);
  };

  return (
    <div
      className={`w-screen h-screen bg-black/50 fixed top-0 left-0
      z-20 `}
    >
      <div className="h-screen flex items-end justify-center">
        <div
          className={`max-w-3xl w-full h-[80vh] rounded-t-xl bg-white shadow-xl
          z-30 overflow-hidden `}
        >
          <div className="relative h-full flex flex-col justify-between pb-5">
            <div className="max-w-3xl w-full py-5 px-14 flex justify-center fixed bg-white rounded-t-2xl">
              <h2 className="font-semibold text-xl sm:text-2xl text-center break-words">
                {isSoldOut ? (
                  <div className="text-neutral-500">{menu.name} (หมด)</div>
                ) : (
                  <div>{menu.name}</div>
                )}
              </h2>

              <button
                className="absolute top-4 right-3 p-2 rounded-full hover:bg-gray-200"
                onClick={() => closeModal()}
              >
                <IoIosArrowDown className="w-6 h-6" />
              </button>
            </div>

            <div className="h-full overflow-y-auto pt-14">
              <img
                src={props.menu.largeImage}
                alt="menu image"
                className="w-full h-full max-h-80 object-cover object-center fade-in"
              />

              <div className="p-5 xl:px-12 flex flex-col gap-y-2">
                <h2 className="font-semibold text-xl sm:text-2xl">
                  {isDiscounted()}
                </h2>

                <div className="h-[2px] bg-neutral-300" />

                {menu.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-y-1 font-semibold text-xl"
                  >
                    <h3>{option.label}</h3>

                    <div className="flex flex-wrap text-sm gap-2 pt-2">
                      {option.choices.map((choice, index) => (
                        <div key={index}>
                          <OptionButton prop={choice.label} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 xl:px-12">
              <button
                className="w-full bg-green-500 text-white py-2 rounded-xl 
                hover:bg-green-400 mt-3"
                onClick={() => closeModal()}
              >
                สั่งเลย!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMenuModal;
