"use client";

import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelectedLayoutSegments } from "next/navigation";
import { useSession,signOut } from "next-auth/react";

export default function SideMenuLayout(props) {
  const {data : session} = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = useSelectedLayoutSegments();
  const menuItems = [
    {
      name: "메세지 발송 이력",
      href: `/talk/useLog`,
      key: "useLog",
    },
    {
      name: "결제 내역",
      href: `/talk/payLog`,
      key: "payLog",
    },
  ];

  useEffect(()=>{
    if(session?.user === null){
      alert('세션이 만료되었습니다');
      signOut({redirect: true});
    }
  },[session]);

  return (
    <>
      <Navbar
        isBordered={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="center">
          <NavbarBrand>
            <Image
              src="/smartcastLogo.png"
              alt="smartcast"
              width={100}
              height={24}
              priority={true}
            />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="sm:hidden" justify="end"></NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem className="text-right">
            <span>{session?.user.site_cd | session?.user.str_cd}</span>
            <Button variant="light" onClick={() => signOut()}>
              {" "}
              sgin out
            </Button>
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index} isActive>
              <Link
                className="w-full"
                style={{
                  color: item.key === pathname[0] ? "dodgerblue" : "",
                }}
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="px-1 py-4 justify-center flex">
          <Image
            src="/smartcastLogo.png"
            alt="smartcast"
            width={100}
            height={24}
            priority={true}
          />
        </div>
        <div className="h-full flex ml-3 px-1 py-4 overflow-y-auto dark:bg-gray-800">
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <span>
                {session?.user.site_cd} | {session?.user.str_cd}
              </span>
              <button
                className="primary-700 pr-4 pb-4 my-auto"
                onClick={() => signOut()}
              >
                {" "}
                sgin out
              </button>
            </div>
            <Divider />
            <ul className="mt-4 space-y-2 font-medium w-full">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className="w-full"
                    style={{
                      color: item.key === pathname[0] ? "dodgerblue" : "",
                    }}
                    href={item.href}
                    size="lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Divider orientation="vertical" />
        </div>
      </aside>
    </>
  );
}
