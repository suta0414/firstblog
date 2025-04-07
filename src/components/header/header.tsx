import Link from "next/link";
import { Hamburger } from "../hamburger/hamburger";
import { NavLinks } from "../navLinks/navLinks";

export function Header() {
  return (
    <div className="relative">
      <div className="flex justify-between md:justify-center items-center bg-blue-400 py-5">
        <h1 className="text-4xl lg:text-5xl font-bold text-white pl-4 md:pl-0">
          <Link href="/">FIRST BLOG</Link>
        </h1>
        <Hamburger />
      </div>
      <NavLinks />
    </div>
  );
}
