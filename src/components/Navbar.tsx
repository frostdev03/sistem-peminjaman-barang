// // src/components/Navbar.tsx

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home, ListChecks, Wrench } from "lucide-react";

// const navLinks = [
//   { href: "/peminjaman", label: "Peminjaman", icon: Home },
//   { href: "/riwayat", label: "Riwayat", icon: ListChecks },
//   { href: "/manajemen", label: "Manajemen", icon: Wrench },
// ];

// export default function Navbar() {
//   // usePathname hanya tersedia di 'use client' components
//   const pathname = usePathname();

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-40">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/peminjaman" className="text-2xl font-bold text-blue-600">
//             P-LAB
//           </Link>
//           <div className="flex space-x-4">
//             {navLinks.map(({ href, label, icon: Icon }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={href}
//                   href={href}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition duration-150
//                     ${
//                       isActive
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
//                     }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="hidden sm:inline">{label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// src/components/Navbar.tsx

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
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/peminjaman"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <Package className="w-8 h-8" />
            <span className="text-xl font-bold">Peminjaman Alat & Bahan</span>
          </Link>

          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === item.href ? "bg-blue-700" : "hover:bg-blue-500"
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
