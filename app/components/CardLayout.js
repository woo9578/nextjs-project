import { IoIosSettings, IoMdPower } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";

const CardLayout = ({ kds }) => {
  return (
    <div className="max-w-sm  rounded overflow-hidden shadow-md my-4">
      <div className="px-3 bg-[#ecf4fb] py-4">
        <div className="font-bold text-xl mb-2 flex justify-between">
          <span>KDS {kds.num}</span>
          <div className="flex">
            <IoIosSettings size={28} className="cursor-pointer text-blue-500" />
            <IoMdPower size={26} className="cursor-pointer text-blue-500" />
          </div>
        </div>
        <div className="text-gray-700 text-base flex justify-between">
          <span> {kds.ip}</span>
          <span> {kds.version}</span>
        </div>
        <div className="text-gray-700 text-base flex mt-3">
          <span>응담상태</span>
          <GrStatusGoodSmall
            size={20}
            className="text-green-500 my-auto ml-1"
          />
        </div>
        <div className="text-gray-700 text-base flex mt-2">
          <span>동작시간</span>
          <span className="ml-1">{kds.time}</span>
        </div>
        <div className="flex justify-end text-[12px] text-center font-black leading-4">
          <span className="w-1/3"> 주문서 </span>
        </div>
        <div className="flex h-7">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm">
            복원
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm mx-2">
            RESET
          </button>
          <div className="w-1/3">
            <input
              disabled
              className="rounded-lg border border-zinc-400 bg-white border-transparent appearance-none w-full"
              placeholder=" "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
