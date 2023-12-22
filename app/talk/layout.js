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
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSelectedLayoutSegments } from "next/navigation";

export default function LogLayout({ children, pageProps }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = useSelectedLayoutSegments();
    const menuItems = [
      {
        name: "메세지 발송 이력",
        href: `/talk/useLog/${pathname[1]}/${pathname[2]}`,
        key: "useLog",
      },
      {
        name: "결제 내역",
        href: `/talk/payLog/${pathname[1]}/${pathname[2]}`,
        key: "payLog",
      },
    ];
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
                src="/smartcastLogo.svg"
                alt="smartcast"
                width={100}
                height={24}
                priority={true}
              />
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="end"></NavbarContent>

          <NavbarMenu>
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
              src="/smartcastLogo.svg"
              alt="smartcast"
              width={100}
              height={24}
              priority={true}
            />
          </div>
          <div className="h-full flex ml-3 px-1 py-4 overflow-y-auto dark:bg-gray-800">
            <ul className="space-y-2 font-medium w-full">
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
            <Divider orientation="vertical" />
          </div>
        </aside>

        <div className="p-4 sm:ml-64">
          {/* <div className="p-4"> */}
          {children}
        </div>
      </>
    );

}