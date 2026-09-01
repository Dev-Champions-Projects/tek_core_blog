"use client";

import {
  LayoutDashboard,
  LogOut,
  Search,
  Menu,
  ChevronDown,
  Bookmark,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/ga";

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
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const sortedCategories = [...(categories ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    }),
  );

  const isLoggedIn = Boolean(userName);

  const router = useRouter();

  return (
    <>
      <NavigationMenu
        viewport={isMobile}
        className="mx-auto max-w-full my-5 z-50 bg-white shadow-md"
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-3 sm:px-4 md:px-0">
          {/* Left side */}
          <NavigationMenuList className="flex shrink-0 flex-nowrap items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
            >
              {/*  <Image
                src="/logo_white.png"
                alt="Tek Core Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              /> */}
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
                <ScrollArea
                  className="category-scrollbar cursor-pointer
                  overflow-y-scroll
     max-h-[45vh] md:max-h-[340px] lg:max-h-[380px] w-[200px] h-[60vh] rounded-md"
                >
                  <ul className=" grid gap-4 p-4 cursor-pointer bg-white shadow-md rounded-md relative z-50">
                    {!loading &&
                      sortedCategories?.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/blog/category/${category.id}`}
                              onClick={() =>
                                trackEvent("select_content", {
                                  content_type: "category",
                                  item_id: category.id,
                                  item_name: category.name,
                                })
                              }
                              className="block rounded-md px-2 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            >
                              {category.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                  </ul>
                </ScrollArea>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Hamburger menu for mobile */}
          <div className="flex md:hidden items-center">
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <Menu className="h-7 w-7" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="p-0">
                <div className="flex max-h-[85vh] flex-col">
                  <div className="border-b border-gray-200 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                      Explore
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      Quick navigation
                    </p>
                  </div>

                  <ScrollArea className="flex-1 min-h-0">
                    <div className="px-4 py-4">
                      <div className="space-y-3">
                        <Link
                          href="/posts/add"
                          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-medium text-gray-700 transition-all hover:-translate-y-0.5 hover:border-black hover:bg-gray-50 hover:text-black"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>Add Post</span>
                          <span className="text-sm text-gray-400">→</span>
                        </Link>

                        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3">
                          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                            All Categories
                          </div>
                          <ul className="flex max-h-[40vh] flex-col gap-1.5 overflow-y-auto pr-1">
                            {!loading &&
                              sortedCategories?.map((category) => (
                                <li key={category.id}>
                                  <Link
                                    href={`/blog/category/${category.id}`}
                                    className="flex rounded-lg px-3 py-2 text-sm text-gray-700 transition transform-gpu hover:-translate-y-0.5 hover:shadow-sm hover:bg-white hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                      trackEvent("select_content", {
                                        content_type: "category",
                                        item_id: category.id,
                                        item_name: category.name,
                                      });
                                      setIsOpen(false);
                                    }}
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="border-t border-gray-200 px-4 py-3">
                    <DrawerClose asChild>
                      <button className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900">
                        Close
                      </button>
                    </DrawerClose>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Right side */}
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem className=" md:block">
              <button
                type="button"
                aria-label="Search"
                className="
    mr-2 flex h-10 w-10
    shrink-0 items-center justify-center
    rounded-full
    text-gray-700
    transition-colors
    hover:bg-gray-100
    sm:mr-4
  "
                onClick={() => setIsOpen(true)}
              >
                <Search className="h-6 w-6" />
              </button>
              <GlobalSearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </NavigationMenuItem>

            {isLoggedIn ? (
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Open profile menu"
                      className="
            flex h-11 items-center gap-2
            rounded-xl bg-gray-100
            px-2 py-1
            outline-none
            transition-colors
            hover:bg-gray-200
            focus-visible:ring-2
            focus-visible:ring-black/20 cursor-pointer
          "
                    >
                      <Avatar className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full border bg-black">
                        <AvatarImage
                          src={userImage}
                          className="h-full w-full object-cover"
                        />

                        <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-black text-xs text-white">
                          {userName ? getNameInitials(userName) : "U"}
                        </AvatarFallback>
                      </Avatar>

                      <ChevronDown className="h-4 w-4 shrink-0 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    side="bottom"
                    sideOffset={8}
                    collisionPadding={12}
                    className="
          z-[100]
          w-52
          max-w-[calc(100vw-24px)]
          rounded-xl
          border
          bg-white
          p-2
          shadow-lg
        "
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="
              flex w-full cursor-pointer
              flex-row items-center gap-3
              rounded-lg px-3 py-3
              text-sm text-gray-800
              outline-none
              hover:bg-gray-100
              focus:bg-gray-100
            "
                      >
                        <LayoutDashboard className="h-5 w-5 shrink-0" />

                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/saved-posts"
                        className="
      flex
      w-full
      cursor-pointer
      flex-row
      items-center
      gap-3
      rounded-lg
      px-3
      py-3
      text-sm
      text-gray-800
      outline-none
      hover:bg-gray-100
      focus:bg-gray-100
    "
                      >
                        <Bookmark className="h-5 w-5 shrink-0" />

                        <span>Saved Posts</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <button
                        type="button"
                        onClick={async () => {
                          await authClient.signOut();
                          router.replace("/sign-in");
                        }}
                        className="
              flex w-full cursor-pointer
              flex-row items-center gap-3
              rounded-lg px-3 py-3
              text-left text-sm text-gray-800
              outline-none
              hover:bg-gray-100
              hover:text-red-600
              focus:bg-gray-100
              focus:text-red-600
            "
                      >
                        <LogOut className="h-5 w-5 shrink-0" />

                        <span>Sign out</span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    </>
  );
}
