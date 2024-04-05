import Link from "next/link";

export default function Footer() {
  return (
    <footer aria-label="Site Footer" className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl sm:px-14 sm:py-4 p-4">

        <div className="lg:flex lg:items-center lg:justify-between mt-4">
          <div>
            <div className="flex justify-center text-violet-600 lg:justify-start">
              <Link href="/">
                <strong className="block font-extrabold text-lg text-violet-500">
                  Lunchoscope
                </strong>
              </Link>
            </div>

          </div>

          <nav aria-label="Footer Nav" className="mt-6 lg:mt-0">
            <ul className="flex flex-wrap-reverse items-center justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
              <li>
                <Link
                  className="text-gray-700 transition hover:text-violet-600"
                  href="/"
                >
                  Home
                </Link>
              </li>


              <li>
                <Link
                  className="text-gray-700 transition hover:text-violet-600"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              
              <li>
                <Link
                  className="text-gray-700 transition hover:text-violet-600"
                  href="/login"
                >
                  Login
                </Link>
              </li>
              <li>
              <Link
            className="inline-block rounded-full bg-amber-400 text-white shadow transition hover:bg-amber-500 p-3 sm:p-4"
            href="#header">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
              </li>
            </ul>
            
          </nav>
          
        </div>

        <p className="my-6 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
