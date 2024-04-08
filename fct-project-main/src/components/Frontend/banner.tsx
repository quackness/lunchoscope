import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 lg:flex lg:items-center lg:px-4">
        <div className="max-w-xl text-center sm:text-left md:pt-6 lg:pl-8 lg:ml-8">
          <h1 className="font-extrabold text-3xl">
            Confused about a place to eat out ?
            <strong className="mt-2 text-4xl block font-extrabold text-transparent bg-clip-text bg-violet-500">
              Lunchoscope!
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-lg sm:leading-relaxed">
            Lunchoscope is a unique website that combines the excitement of astrology with the practicality of finding the perfect place to dine. 
            <br/>By simply inputting your horoscope, Lunchoscope generates tailored restaurant recommendations in your vicinity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/login"
              className="sm:hidden block w-full rounded bg-green-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-600 focus:outline-none focus:ring active:bg-green-500 sm:w-auto">
              Login
            </Link>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:ml-12 lg:flex-1 lg:pl-4 pointer-events-none">
          <Image
            alt="banner"
            src="/img/lunchoscope.png"
            className="hidden lg:block"
            width={700}
            height={700}
          />
        </div>
      </div>
    </section>
  );
}
