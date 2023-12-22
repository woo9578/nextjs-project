"use client"

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  AiOutlineMenuFold,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import {
  MdOutlineDashboard,
  MdDashboardCustomize,
  MdAccessTime,
} from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { IoFileTray, IoChevronDown, IoChevronUp } from "react-icons/io5";

const MenuLayout = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];

  const dashboards = [
    { name: "장비 상태 관리", link: "/", icon: IoFileTray },
    { name: "매장 주문 조회", link: "/", icon: MdAccessTime },
    { name: "환경 설정", link: "/", icon: MdDashboardCustomize },
  ];

  const [open, setOpen] = useState(true);

  const [drop, setDrop] = useState({
    dispaly: true,
    getIcon: IoChevronDown,
  });

  const onclick = () => {
    setDrop({
      ...drop,
      ["dispaly"]: !drop.dispaly,
      ["getIcon"]: !drop.dispaly ? IoChevronDown : IoChevronUp,
    });
  };

  return (
    <div
      className={`min-h-screen divide-y ${
        open ? "w-72" : "w-16"
      } duration-500 pl-4`}
    >
      <div
        className={`py-3 mb-4 flex  ${
          open ? "justify-between pr-4" : "justify-end"
        }`}
      >
        <Image
          src="/smartcastLogo.svg"
          width={100}
          height={100}
          alt="smartcast Logo"
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        <AiOutlineMenuFold
          size={26}
          className="cursor-pointer my-auto"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open ? (
        <div className="flex flex-col gap-1 py-4 relative text-center">
          <span className="text-[12px] font-extrabold">
            브랜드 코드/ 브랜드 명: 1001 롯데이라
          </span>
          <span className="text-[10px] text-gray-400">
            가맹점 코드/ 가맹점 명: 59213 구로점
          </span>
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-4 relative">
        <div
          className="flex cursor-pointer justify-between text-gray-400 font-bold"
          onClick={onclick}
        >
          <span>{open ? "DASHBOARDS" : ""}</span>
          <div>
            {React.createElement(drop?.getIcon, {
              size: "26",
              className: "mr-4 text-blue-500",
            })}
          </div>
        </div>

        {dashboards?.map((menu, i) => (
          <Link
            href={menu?.link}
            key={i}
            className={` whitespace-pre duration-500 mr-3
                ${!drop.dispaly && "opacity-0 translate-y-28 overflow-hidden"}
                group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>
              {React.createElement(menu?.icon, {
                size: "20",
                className: "text-blue-500",
              })}
            </div>
            <h2
              className={`whitespace-pre duration-500 font-bold ${
                !open && "opacity-0 translate-y-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
        {/* {menus?.map((menu, i) => (
                <Link
                to={menu?.link}
                key={i}
                className={` ${
                    menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                    className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                    {menu?.name}
                </h2>
                </Link>
            ))} */}
      </div>
    </div>
  );
};

export default MenuLayout;
