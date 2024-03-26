import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-4">
        <div className="max-w-xl text-center sm:text-left lg:pl-12">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Confused about a place to eat out ?
            <strong className="block font-extrabold text-transparent bg-clip-text to-green-500 bg-[#C900FF]">
              Lunchoscope!
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
          Lunchoscope is a unique website that combines the excitement of astrology with the practicality of finding the perfect place to dine. By simply inputting your horoscope, Lunchoscope generates tailored restaurant recommendations in your vicinity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/reserva"
              className="block w-full rounded bg-[#0036FF] px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto">
              Login
            </Link>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:ml-16 lg:flex-1 lg:pl-8 pointer-events-none">
          <Image
            alt="banner"
            src="/img/lunchoscope.png"
            className="hidden lg:block"
            width={800}
            height={900}
          />
        </div>
      </div>
    </section>
  );
}
