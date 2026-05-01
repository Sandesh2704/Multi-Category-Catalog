
import Link from "next/link";
import { Container } from "./Container";




export default function Header() {









  return (
    <>
      <header className={`sticky top-0 z-40 w-full bg-white  border-b border-gray-200 transition-all duration-300`}>





        <Container className="">

          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link title={`Home`} href={`/`} className="flex items-center space-x-2">
              Assignment Store
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">

              <Link title={`Home `} href={`/`} className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Home
              </Link>

            </nav>


          </div>

        </Container>
      </header>


    </>
  );
}