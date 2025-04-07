"use client";

import Link from "next/link";
import { useState } from "react";

export function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="z-10 pr-8 pl-2 py-2 flex justify-between items-center text-slate-950 md:hidden ">
      <button
        className="navbar-burger flex items-center text-white p-3 flex-row-reverse flex-grow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="block h-6 w-6 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      <div
        className={`fixed inset-0 bg-neutral-800 transition-opacity duration-300 ${
          isOpen ? "opacity-75 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 bottom-0 flex flex-col w-2/3 py-6 px-6 bg-neutral-950/90 overflow-y-auto
          transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Logo & Close button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <div className="mr-auto text-3xl font-bold leading-none">
              <div className="textShadow_wt text-white text-[2.2rem] font-bold text-nowrap max-[1000px]:text-[1.4rem] ">
                MENU
              </div>
            </div>
          </Link>
          <button
            className="navbar-close ml-14"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col text-2xl text-white">
          <li className="text-center border-b-2 pb-2 mb-4">
            <Link href="/" aria-current="page">
              TOP
            </Link>
          </li>
          <li className="text-center border-b-2 pb-2 mb-4">
            <Link href="/profile" aria-current="page">
              PROFILE
            </Link>
          </li>
          <li className="text-center border-b-2 pb-2 mb-4">
            <Link href="/tag" aria-current="page">
              TAG
            </Link>
          </li>
          <li className="text-center border-b-2 pb-2 mb-4">
            <Link href="/author" aria-current="page">
              AUTHOR
            </Link>
          </li>
          <li className="text-center border-b-2 pb-2 mb-4">
            <Link href="/contact" aria-current="page">
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
