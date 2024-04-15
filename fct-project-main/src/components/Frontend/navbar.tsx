import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/Context/userAuth";
import { IoMdLogOut } from "react-icons/io";
import cookie from 'cookie-cutter';
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { user, setUser } = useAuth();

  const { data: session } = useSession()

  const handleLogout = () => {

    if (session) {
      signOut();
    }

    cookie.set('authToken', "expired");
    setUser(null);
    console.log("NAV session", session);

  }

  return (
    <header aria-label="Site Header" className="bg-violet-600" id="header">
      <div className="mx-auto max-w-screen-xl p-6">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="block font-extrabold text-2xl text-white">
                Lunchoscope
              </span>
              {/* <Image
                alt="logo"
                src="/ico/ico.png"
                width={80}
                height={80}
                className="absolute top-0"
              /> */}
            </Link>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            <Link href="/" passHref>
              <span
                className={`${router.pathname === "/"
                  ? "text-yellow-300"
                  : "text-yellow-300 hover:text-gray-900 transition"
                  }  text-lg`}
              >
                Home
              </span>
            </Link>

            <Link href="/pricing" passHref>
              <span
                className={`${router.pathname === "/pricing"
                  ? "text-yellow-300"
                  : "text-yellow-300 hover:text-gray-900 transition "
                  } text-lg`}
              >
                Pricing
              </span>
            </Link>
            {user?.isAdmin && (
              <Link href="/admin/users" passHref>
                <span
                  className={`${router.pathname === "/admin/users"
                    ? "text-yellow-300"
                    : "text-yellow-300 hover:text-gray-900 transition "
                    } text-base`}
                >
                  Admin
                </span>
              </Link>
            )}
          </nav>


          <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
            {user ? (

              <>
                <span className="rounded-lg bg-amber-400 transition hover:bg-amber-500 px-5 py-2 text-sm font-medium text-white">
                  Welcome back, <span className="capitalize">{user?.name}</span>
                </span>
                <IoMdLogOut onClick={handleLogout} className="text-amber-400 text-3xl cursor-pointer" />

              </>

            ) : (
              <Link href="/login2" passHref>
                <span className="rounded-lg bg-amber-400 transition hover:bg-amber-500 px-5 py-2 text-base font-medium text-white">
                  Login
                </span>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              className="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="fixed inset-x-4 top-[3.5rem] bg-white shadow-md p-4 overflow-y-auto z-[1000]">
                <nav aria-label="Mobile Site Nav">
                  <ul className="space-y-4 text-center mx-6 ">
                    <li>
                      <Link href="/" passHref>
                        <span
                          onClick={() => setMenuOpen(false)}
                          className={`${router.pathname === "/blog"
                            ? "text-gray-500"
                            : "text-gray-500 hover:text-gray-900 transition "
                            } text-base`}
                        >
                          Home
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" passHref>
                        <span
                          onClick={() => setMenuOpen(false)}
                          className={`${router.pathname === "/pricing"
                            ? "text-gray-500"
                            : "text-gray-500 hover:text-gray-900 transition"
                            }  text-base`}
                        >
                          Pricing
                        </span>
                      </Link>
                    </li>
                    {user?.isAdmin && (
                      <li>
                        <Link href="/admin/users" passHref>
                          <span
                            className={`${router.pathname === "/admin/users"
                              ? "text-gray-500"
                              : "text-gray-500 hover:text-gray-900 transition "
                              } text-base`}
                          >
                            Admin
                          </span>
                        </Link>
                      </li>
                    )}

                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
