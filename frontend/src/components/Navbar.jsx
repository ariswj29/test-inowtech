"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/services/auth";
import { getCookies } from "@/helpers/cookies";

const navbars = [
  { id: 1, title: "Classes", link: "/classes" },
  { id: 2, title: "Students", link: "/students" },
  { id: 3, title: "Teachers", link: "/teachers" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const cookies = getCookies();
    const token = cookies.token;
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <header className="grid md:grid-cols-3 grid-cols-2 md:px-40 bg-white px-4 items-center border-b-2  sticky top-0 z-50">
      <div className="md:col-span-2 sm:col-span-1 py-2">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/logo.jpg" alt="school" width={50} height={25} />
            <label className="text-xl font-bold ml-2">School Management</label>
          </div>
        </Link>
      </div>
      <div className="md:hidden md:col-span-1 sm:col-span-1 py-6 justify-self-end">
        <button
          className="flex items-center rounded border-2 border-black px-3 py-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? "col-span-2 md:col-span-1" : "hidden"
        } md:block py-4`}
      >
        <nav>
          <ul className="grid md:grid-cols-5 gap-4 items-center">
            {isLogin ? (
              <li className="text-center">
                <Link href="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="text-center">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            {navbars.map((navbar) => (
              <li key={navbar.id} className="text-center">
                <Link
                  href={isLogin ? navbar.link : "/login"}
                  className={pathname === navbar.link ? "active" : "nav-link"}
                >
                  {navbar.title}
                </Link>
              </li>
            ))}
            {isLogin ? (
              <li className="text-center">
                <Link
                  href="/"
                  className="nav-link"
                  onClick={() => {
                    async function deleteSession() {
                      await logout();
                      window.location.href = "/";
                    }
                    deleteSession();
                  }}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="text-center">
                <Link href="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
