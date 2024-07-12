"use client";
// React
import { Fragment, ReactElement, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// Next
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Identicon
import Identicon from "identicon.js";
// Heroicons
import {
  Bars3Icon,
  BeakerIcon,
  HomeIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import { useGeneral } from "../../Context/GeneralContextProvider";
import { useLogin } from "../../Context/LoginContextProvider";

import Logo from "../../../public/logo.svg";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Paymasters",
    href: "/paymasters",
    icon: CurrencyDollarIcon,
  },
  { name: "Integrations", href: "/integrations", icon: BeakerIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SideBarProps {
  page: ReactElement;
  isProfile?: boolean;
  isChat?: boolean;
}

export default function SideBar({ page }: SideBarProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { favoritesPaymasters } = useGeneral();
  const { smartAccount } = useLogin();

  const pathname = usePathname();

  const wallet = "0x";
  return (
    <div className="text-white bg-main">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 " />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link href="/">
                      <Image
                        height={32}
                        width={32}
                        src={Logo.src}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-black"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.name.toLowerCase() ===
                                    pathname.slice(1, pathname.length) ||
                                    (pathname === "/" &&
                                      item.name.toLowerCase() === "home")
                                    ? "text-gray-900 hover:text-gray-900"
                                    : "text-gray-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-green-700"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.name.toLowerCase() ===
                                      pathname.slice(1, pathname.length) ||
                                      (pathname === "/" &&
                                        item.name.toLowerCase() === "home")
                                      ? "text-gray-900"
                                      : "text-gray-600 group-hover:text-green-700",
                                    `h-6 w-6 shrink-0 ${
                                      item.icon === BeakerIcon && "rotate-270"
                                    }`
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col border-r-1 border-greenMatrix">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto  pb-4">
          <div className="flex shrink-0 items-center mt-4 px-6 h-fit">
            <Link href="/">
              <Image
                height={128}
                width={128}
                src={Logo.src}
                alt="Your Company"
                className="h-16"
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col px-6">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          pathname
                            .slice(1, pathname.length)
                            .includes(item.name.toLowerCase()) ||
                            (pathname === "/" &&
                              item.name.toLowerCase() === "home")
                            ? "text-greenMatrix"
                            : "text-gray-600",
                          `group flex gap-x-3 rounded-md px-2 py-5 text-sm leading-6 font-semibold ${
                            pathname !== item.href && "hover:text-green-700"
                          }`
                        )}
                      >
                        <item.icon
                          className={classNames(
                            pathname
                              .slice(1, pathname.length)
                              .includes(item.name.toLowerCase()) ||
                              (pathname === "/" &&
                                item.name.toLowerCase() === "home")
                              ? "text-greenMatrix"
                              : "text-gray-600 group-hover:text-green-700",
                            `h-6 w-6 shrink-0 ${
                              item.icon === BeakerIcon && "rotate-270"
                            }`
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}{" "}
                  {smartAccount && (
                    <li>
                      <Link
                        href={`/profile/${wallet}`}
                        className={classNames(
                          pathname.slice(1, pathname.length).includes("profile")
                            ? "text-greenMatrix"
                            : "text-gray-600 hover:text-green-700",
                          "group flex gap-x-3 rounded-md px-2 py-5 text-sm leading-6 font-semibold "
                        )}
                      >
                        <Image
                          width={24}
                          height={24}
                          alt="Profile Image"
                          src={`data:image/png;base64,${new Identicon(
                            smartAccount,
                            64
                          ).toString()}`}
                          className="rounded-full"
                        />
                        Profile
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </nav>
          <div className="min-h-[300px]">
            <h2 className="pb-4 border-b-1 border-greenMatrix px-6 font-semibold w-full text-2xl">
              Favorite Paymasters
            </h2>
            <div className="px-6 mt-4">
              {favoritesPaymasters.length > 0 ? (
                <div className="font-semibold text-lg text-greenMatrix">
                  {favoritesPaymasters.slice(0, 3).map((paymaster: any) => {
                    return <div className="pt-4 pb-6">{paymaster.title}</div>;
                  })}
                  {favoritesPaymasters.length >= 3 && (
                    <Link
                      href="/paymasters"
                      className="underline underline-offset-4 text-sm"
                    >
                      See more
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center font-semibold text-lg">
                  <span>Add paymasters to your favorites</span>
                  <br></br>
                  <Link
                    href="/paymasters"
                    className="text-greenMatrix font-bold text-xl underline underline-offset-4"
                  >
                    Go!
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pl-72 ">
        <div className="sticky lg:hidden top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <main className="pb-10">
          <Navbar />
          <div className="px-4 sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
}
