import Image from "next/image";
import Link from "next/link";

import logo from "../assets/default.png";
import { Button } from "./ui/button";
export default function NavBar() {
  return (
    <>
      <header className="px-6 py-3 shadow-md">
        <nav className="flex items-center justify-between max-w-5xl mx-auto">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <Image src={logo} width={40} height={40} alt="Blue collar logo" />
              <span className="text-base font-bold text-blue-950">
                Blue Collar
              </span>
            </div>
          </Link>

          <Button asChild>
            <Link href={"/jobs/new"}>Post a Job</Link>
          </Button>
        </nav>
      </header>
    </>
  );
}
