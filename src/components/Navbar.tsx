// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Package, Menu } from "lucide-react";
// import { useState } from "react";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { href: "/peminjaman", label: "Peminjaman" },
//     { href: "/manajemen", label: "Manajemen" },
//     { href: "/riwayat", label: "Riwayat" },
//   ];

//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             href="/peminjaman"
//             className="flex items-center gap-3 hover:opacity-80 transition"
//           >
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Package className="w-6 h-6 text-blue-600" />
//             </div>
//             <span className="font-bold text-gray-900 hidden sm:inline">
//               Pinjam Lab
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
//                   pathname === item.href
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden pb-4 border-t border-gray-100">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
//                   pathname === item.href
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const PROTECTED_PASSWORD = "teknisidtee";

  const navItems = [
    { href: "/peminjaman", label: "Peminjaman", protected: false },
    { href: "/manajemen", label: "Manajemen", protected: true },
    { href: "/riwayat", label: "Riwayat", protected: true },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isProtected: boolean
  ) => {
    const item = navItems.find((i) => i.href === href);
    if (isProtected && pathname !== href) {
      e.preventDefault();
      setPendingPath(href);
      setShowPasswordModal(true);
      setPassword("");
      setPasswordError("");
    }
  };

  const handlePasswordSubmit = () => {
    if (password === PROTECTED_PASSWORD) {
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError("");
      if (pendingPath) {
        router.push(pendingPath);
        setIsOpen(false);
      }
    } else {
      setPasswordError("Password salah!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/peminjaman"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-bold text-gray-900 hidden sm:inline">
                Pinjam Lab
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.protected)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.protected)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Masukkan Password</h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword("");
                  setPasswordError("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="Masukkan password"
              className="input-field w-full mb-4"
              autoFocus
            />

            {passwordError && (
              <p className="text-red-600 text-sm mb-4 font-semibold">
                {passwordError}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword("");
                  setPasswordError("");
                }}
                className="flex-1 btn-secondary py-3 font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 btn-primary py-3 font-semibold"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
