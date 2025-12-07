// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Package } from "lucide-react";

// const Navbar = () => {
//   const pathname = usePathname();

//   const navItems = [
//     { href: "/peminjaman", label: "Peminjaman" },
//     { href: "/manajemen", label: "Manajemen Barang" },
//     { href: "/riwayat", label: "Riwayat" },
//   ];

//   // Nilai Piksel Tetap untuk Navbar
//   const NAV_HEIGHT = "64px"; // Tinggi Navbar: 64px (h-16)
//   const ICON_SIZE = "32px"; // Ukuran Ikon Package: 32px (w-8 h-8)
//   const LINK_PADDING_X = "16px"; // Padding horizontal tombol: 16px (px-4)
//   const LINK_PADDING_Y = "10px"; // Padding vertikal tombol (disesuaikan agar rapi)
//   const LOGO_GAP = "12px"; // Jarak antara Logo dan Teks: 12px (space-x-3)
//   const MENU_GAP = "16px"; // Jarak antar tombol menu: 16px (space-x-4)
//   const CONTAINER_PADDING_X = "24px"; // Sebelumnya 16px (px-4)

//   return (
//     <nav
//       className="bg-blue-600 text-white shadow-lg"
//       style={{ height: NAV_HEIGHT }} // Tinggi Navbar tetap 64px
//     >
//       {/* Container utama, padding horizontal 16px (px-4) */}
//       <div
//         className="container mx-auto px-4 h-full"
//         style={{
//           paddingLeft: CONTAINER_PADDING_X,
//           paddingRight: CONTAINER_PADDING_X,
//         }}
//       >
//         <div
//           className="flex items-center justify-between h-full"
//           // Pastikan konten di tengah secara vertikal
//         >
//           {/* KIRI: Logo & Teks Brand */}
//           <Link
//             href="/peminjaman"
//             className="flex items-center transition"
//             style={{ gap: LOGO_GAP }} // Jarak Logo dan Teks: 12px
//           >
//             <Package
//               style={{ width: ICON_SIZE, height: ICON_SIZE }} // Ukuran ikon 32px
//             />
//             <span className="text-xl font-bold">Peminjaman Alat & Bahan</span>
//           </Link>

//           {/* KANAN: Tombol Navigasi Menu */}
//           <div
//             className="flex items-center"
//             style={{ gap: MENU_GAP }} // Jarak antar menu: 16px (Menggantikan space-x-1)
//           >
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`rounded-lg transition font-medium text-sm lg:text-base ${
//                   pathname === item.href
//                     ? "bg-blue-700 shadow-inner"
//                     : "hover:bg-blue-500"
//                 }`}
//                 style={{
//                   paddingLeft: LINK_PADDING_X, // px-4 = 16px
//                   paddingRight: LINK_PADDING_X, // px-4 = 16px
//                   paddingTop: LINK_PADDING_Y, // py-2 = 8px (ditingkatkan sedikit)
//                   paddingBottom: LINK_PADDING_Y, // py-2 = 8px (ditingkatkan sedikit)
//                 }}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/peminjaman", label: "Peminjaman" },
    { href: "/manajemen", label: "Manajemen" },
    { href: "/riwayat", label: "Riwayat" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
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
              LabLoan
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
