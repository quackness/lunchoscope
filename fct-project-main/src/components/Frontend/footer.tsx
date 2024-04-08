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

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
            Discover your cosmic cravings, dine with delight!
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
