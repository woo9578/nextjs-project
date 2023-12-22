"use client";

import MenuLayout from "../components/MainLayout";
import CardLayout from "../components/CardLayout";
import { IoIosSettings, IoMdPower } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useState } from "react";

export default function DashBoard() {
  const smartcastKds = [
    {
      num: 161,
      ip: "192.168.0.161",
      version: "v 2.93",
      status: true,
      time: "2023-10-10 03:56:43",
      usetime: "",
    },
    {
      num: 162,
      ip: "192.168.0.162",
      version: "v 2.93",
      status: true,
      time: "2023-10-11 03:56:33",
      usetime: "",
    },
    {
      num: 163,
      ip: "192.168.0.163",
      version: "v 2.93",
      status: true,
      time: "2023-10-12 03:56:23",
      usetime: "",
    },
    {
      num: 164,
      ip: "192.168.0.164",
      version: "v 2.93",
      status: true,
      time: "2023-10-13 03:56:53",
      usetime: "",
    },
    {
      num: 165,
      ip: "192.168.0.165",
      version: "v 2.93",
      status: true,
      time: "2023-10-14 03:56:13",
      usetime: "",
    },
  ];

  const pospc = [
    {
      name: "배달PC",
      ip: "192.168.0.199",
      version: "v 1.01",
      status: true,
      time: "05:06:07",
    },
    {
      name: "메인포스",
      ip: "192.168.0.199",
      version: "v 1.01",
      status: true,
      time: "05:06:07",
    },
  ];

  const server = {
    name: "KDS SERVER",
    ip: "192.168.0.189",
    version: "v 2.9",
    status: true,
    time: "2023-10-16 13:05:06",
  };

  const dids = [
    {
      num: "1",
      ip: "192.168.0.199",
      version: "v 2.93",
      status: true,
      time: "05:06:07",
    },
    {
      num: "2",
      ip: "192.168.0.199",
      version: "v 2.93",
      status: true,
      time: "05:06:07",
    },
  ];

  const kiosks = [
    {
      num: 1,
      ip: "192.168.0.161",
      version: "v 1.01",
      status: true,
      time: "03.56.13",
    },
    {
      num: 2,
      ip: "192.168.0.162",
      version: "v 1.01",
      status: true,
      time: "03.56.13",
    },
    {
      num: 3,
      ip: "192.168.0.163",
      version: "v 1.01",
      status: false,
      time: "03.56.13",
    },
    {
      num: 4,
      ip: "192.168.0.164",
      version: "v 1.01",
      status: false,
      time: "03.56.13",
    },
    {
      num: 5,
      ip: "192.168.0.165",
      version: "v 1.01",
      status: true,
      time: "03.56.13",
    },
  ];

  const [updateKds, setUpdateKds] = useState(smartcastKds);

  return (
    // <section className="flex gap-6  divide-x">
    <section className="flex flex-row divide-x relative">
      <MenuLayout />
      <div className="text-xl text-gray-900 font-semibold flex-col grow divide-y">
        <div className="flex justify-between min-w-full px-8 pt-4 mb-8">
          <span> 장비 상태 관리 </span>
          <span> 새로고침 </span>
        </div>
        <div className="flex flex-row pt-6">
          <div className="basis-1/4 grid-flow-row pl-8 ml-8 mr-4 h-full">
            {updateKds?.map((kds, i) => (
              <CardLayout key={i} kds={kds} />
            ))}
          </div>
          <div className="basis-1/2 flex flex-col h-full">
            <div className="flex justify-center h-full w-full">
              {pospc?.map((pos, i) => (
                <div
                  className="max-w-sm rounded overflow-hidden shadow-md my-4 flex-1 mx-4"
                  key={i}
                >
                  <div className="px-3 bg-[#ecf4fb] py-4">
                    <div className="font-bold text-xl mb-2 flex justify-between">
                      <span>{pos.name}</span>
                    </div>
                    <div className="text-gray-700 text-base flex justify-between">
                      <span> {pos.ip}</span>
                      <span> {pos.version}</span>
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
                      <span className="ml-1">{pos.time}</span>
                    </div>
                    <div className="flex h-7 mt-4 justify-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm">
                        TEST
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-1/2 mx-auto h-[425px] justify-center">
              <div className="max-w-sm rounded overflow-hidden shadow-md flex-1 mx-4 m-auto">
                <div className="px-3 bg-[#ecf4fb] py-4">
                  <div className="font-bold text-xl mb-2 flex justify-between">
                    <span>{server.name}</span>
                    <IoIosSettings
                      size={28}
                      className="cursor-pointer text-blue-500"
                    />
                  </div>
                  <div className="text-gray-700 text-base flex justify-between">
                    <span> {server.ip}</span>
                    <span> {server.version}</span>
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
                    <span className="ml-1">
                      {/* <Moment date={currentTime }></Moment> */}
                      56:59:59
                    </span>
                  </div>
                  <div className="flex h-7 mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm">
                      복원
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm mx-2">
                      RESET
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm">
                      TEST
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {dids?.map((did, i) => (
                <div
                  className="max-w-sm  rounded overflow-hidden shadow-md my-4 flex-1 mx-4"
                  key={i}
                >
                  <div className="px-3 bg-[#ecf4fb] py-4">
                    <div className="font-bold text-xl mb-2 flex justify-between">
                      <span>DID{did.name}</span>
                    </div>
                    <div className="text-gray-700 text-base flex justify-between">
                      <span> {did.ip}</span>
                      <span> {did.version}</span>
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
                      <span className="ml-1">{did.time}</span>
                    </div>
                    <div className="flex h-7 mt-4 justify-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm">
                        TEST
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="basis-1/4 grid-flow-row mr-8">
            {kiosks?.map((pos, i) => (
              <div
                className={`${
                  !pos.status && "contrast-50"
                } max-w-sm  rounded overflow-hidden shadow-md my-4 flex-1 mx-4`}
                key={i}
              >
                <div className="px-3 bg-[#ecf4fb] py-4 ">
                  <div className="font-bold text-xl mb-2 flex justify-between">
                    <span>무인 포스 {pos.num}</span>
                  </div>
                  <div className="text-gray-700 text-base flex justify-between">
                    <span> {pos.ip}</span>
                    <span> {pos.version}</span>
                  </div>
                  <div className="text-gray-700 text-base flex mt-3">
                    <span>응담상태</span>
                    <GrStatusGoodSmall
                      size={20}
                      className={`${
                        !pos.status && "text-red-600"
                      } text-green-500 my-auto ml-1`}
                    />
                  </div>
                  <div className="text-gray-700 text-base flex mt-2">
                    <span>동작시간</span>
                    <span className="ml-1">{pos.time}</span>
                  </div>
                  <div className="flex h-7 mt-4 justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/3 rounded-full text-sm">
                      TEST
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
