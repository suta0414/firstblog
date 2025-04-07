import Link from "next/link";

export function NavLinks() {
  return (
    <div>
      <nav className="hidden md:block max-w-[1300px] mx-auto lg:px-4">
        <ul className="flex flex-row justify-between h-12">
          <li className="flex-1 text-center content-center border-l-2">
            <Link href="/" aria-current="page">
              TOP
            </Link>
          </li>
          <li className="flex-1 text-center content-center border-l-2">
            <Link href="/profile" aria-current="page">
              PROFILE
            </Link>
          </li>
          <li className="flex-1 text-center content-center border-l-2">
            <Link href="/tag" aria-current="page">
              TAG
            </Link>
          </li>
          <li className="flex-1 text-center content-center border-l-2">
            <Link href="/author" aria-current="page">
              AUTHOR
            </Link>
          </li>
          <li className="flex-1 text-center content-center border-l-2 border-r-2">
            <Link href="/contact" aria-current="page">
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
