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

//   return (
//     <nav className="bg-blue-600 text-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <Link
//             href="/peminjaman"
//             className="flex items-center space-x-2 hover:opacity-80 transition"
//           >
//             <Package className="w-8 h-8" />
//             <span className="text-xl font-bold">Peminjaman Alat & Bahan</span>
//           </Link>

//           <div className="flex space-x-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`px-4 py-2 rounded-lg transition ${
//                   pathname === item.href ? "bg-blue-700" : "hover:bg-blue-500"
//                 }`}
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
import { Package } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/peminjaman", label: "Peminjaman" },
    { href: "/manajemen", label: "Manajemen Barang" },
    { href: "/riwayat", label: "Riwayat" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            href="/peminjaman"
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90 transition pl-4"
          >
            <Package className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-bold whitespace-nowrap">
              Peminjaman Alat & Bahan
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${
                  pathname === item.href
                    ? "bg-blue-700 text-white"
                    : "text-blue-50 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
