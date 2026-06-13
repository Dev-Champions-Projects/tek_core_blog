"use client";

import { LayoutDashboard, LogOut, Search, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCategoriesContext } from "./categories-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { getNameInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import GlobalSearchModal from "./global-search-modal";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";

import { useRouter } from "next/navigation";

export function NavMenu({
  userName,
  userImage,
}: {
  userName?: string;
  userImage?: string;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { categories, loading } = useCategoriesContext();

  const isLoggedIn = Boolean(userName);

  const router = useRouter();

  return (
    <NavigationMenu
      viewport={isMobile}
      className="mx-auto max-w-full my-5 z-50  bg-white shadow-md "
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between ">
        {/* Left side */}
        <NavigationMenuList className="flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo_white.png"
              alt="Tek Core Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            TEK CORE
          </Link>
          {/*   <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem> */}
        </NavigationMenuList>

        {/* Middle links (desktop only) */}
        <NavigationMenuList className="flex-wrap hidden md:flex">
          <NavigationMenuItem>
            <Link href="/posts/add">Add Post</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4 p-4 bg-white shadow-md rounded-md relative z-50">
                {!loading &&
                  categories?.map((category) => (
                    <li key={category.id}>
                      <NavigationMenuLink asChild>
                        <Link href={`/blog/category/${category.id}`}>
                          {category.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Hamburger menu for mobile */}
        <div className="flex md:hidden items-center">
          <Drawer>
            <DrawerTrigger asChild>
              <button aria-label="Open menu">
                <Menu className="w-7 h-7" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <div className="flex flex-col gap-4">
                <Link
                  href="/posts/add"
                  className="text-lg font-medium"
                  onClick={() => {}}
                >
                  Add Post
                </Link>
                <div>
                  <div className="text-lg font-medium mb-2">All Categories</div>
                  <ul className="flex flex-col gap-2">
                    {!loading &&
                      categories?.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/blog/category/${category.id}`}
                            className="text-base"
                            onClick={() => {}}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <DrawerClose asChild>
                  <button className="mt-4 text-sm text-gray-500">Close</button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Right side */}
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem className=" md:block">
            <div
              className="mr-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Search />
            </div>
            <GlobalSearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </NavigationMenuItem>

          {isLoggedIn ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar className="h-9 w-9 rounded-full border overflow-hidden cursor-pointer bg-black">
                  <AvatarImage src={userImage} className="object-cover" />
                  <AvatarFallback className="h-9 w-9 bg-black text-white text-xs flex items-center justify-center rounded-full">
                    {userName ? getNameInitials(userName) : "U"}
                  </AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-0 min-w-[180px] w-max max-w-[90vw] sm:absolute sm:left-0">
                <ul className="flex flex-col gap-0.5 p-2 bg-white shadow-md rounded-md">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard"
                        className="flex flex-row items-center px-2 py-4 mb-3 mt-3 rounded hover:bg-gray-100 hover:text-blue-600"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-1" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={async () => {
                          await authClient.signOut();
                          router.push("/sign-in");
                        }}
                        className="flex flex-row items-center px-2 py-1 w-full cursor-pointer text-left rounded hover:bg-gray-100 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        <span className="text-sm">Sign out</span>
                      </button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link
                href="/sign-in"
                className="font-medium px-4 py-2 rounded bg-black text-white hover:transition-colors hover:bg-gray-800 hover:text-white"
              >
                Login
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
