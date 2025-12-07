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
//     <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
//       <div className=" max-w-[1200px]">
//         {" "}
//         {/* JARAK KIRI DI SINI */}
//         <div className="flex ml-6 items-center justify-between h-16">
//           <Link href="/peminjaman" className="flex items-center gap-3">
//             <Package className=" w-[36px] h-[36px]" />
//             <span className="text-[18px] font-bold mt-12">
//               Peminjaman Alat & Bahan
//             </span>
//           </Link>

//           {/* RIGHT: nav items */}
//           <div
//             // BUTTON ROW GAP -> gap-[12px]
//             // Align items to top edge within navbar if you want "right-top" feel:
//             // change items-center -> items-start and add pt to buttons if needed.
//             className="flex items-center gap-[12px]"
//           >
//             {navItems.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   // BUTTON PADDING -> px-[14px] py-[8px]
//                   // BUTTON FONT SIZE -> text-[14px]
//                   // BUTTON BORDER RADIUS -> rounded-[8px]
//                   className={`px-[14px] py-[8px] rounded-[8px] text-[14px] font-medium transition-all whitespace-nowrap ${
//                     isActive
//                       ? "bg-blue-700 text-white"
//                       : "bg-transparent text-white hover:bg-blue-500/90"
//                   }`}
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
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

  // Nilai Piksel Tetap untuk Navbar
  const NAV_HEIGHT = "64px"; // Tinggi Navbar: 64px (h-16)
  const ICON_SIZE = "32px"; // Ukuran Ikon Package: 32px (w-8 h-8)
  const LINK_PADDING_X = "16px"; // Padding horizontal tombol: 16px (px-4)
  const LINK_PADDING_Y = "10px"; // Padding vertikal tombol (disesuaikan agar rapi)
  const LOGO_GAP = "12px"; // Jarak antara Logo dan Teks: 12px (space-x-3)
  const MENU_GAP = "16px"; // Jarak antar tombol menu: 16px (space-x-4)
  const CONTAINER_PADDING_X = "24px"; // Sebelumnya 16px (px-4)

  return (
    <nav
      className="bg-blue-600 text-white shadow-lg"
      style={{ height: NAV_HEIGHT }} // Tinggi Navbar tetap 64px
    >
      {/* Container utama, padding horizontal 16px (px-4) */}
      <div
        className="container mx-auto px-4 h-full"
        style={{
          paddingLeft: CONTAINER_PADDING_X,
          paddingRight: CONTAINER_PADDING_X,
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          // Pastikan konten di tengah secara vertikal
        >
          {/* KIRI: Logo & Teks Brand */}
          <Link
            href="/peminjaman"
            className="flex items-center transition"
            style={{ gap: LOGO_GAP }} // Jarak Logo dan Teks: 12px
          >
            <Package
              style={{ width: ICON_SIZE, height: ICON_SIZE }} // Ukuran ikon 32px
            />
            <span className="text-xl font-bold">Peminjaman Alat & Bahan</span>
          </Link>

          {/* KANAN: Tombol Navigasi Menu */}
          <div
            className="flex items-center"
            style={{ gap: MENU_GAP }} // Jarak antar menu: 16px (Menggantikan space-x-1)
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg transition font-medium text-sm lg:text-base ${
                  pathname === item.href
                    ? "bg-blue-700 shadow-inner"
                    : "hover:bg-blue-500"
                }`}
                style={{
                  paddingLeft: LINK_PADDING_X, // px-4 = 16px
                  paddingRight: LINK_PADDING_X, // px-4 = 16px
                  paddingTop: LINK_PADDING_Y, // py-2 = 8px (ditingkatkan sedikit)
                  paddingBottom: LINK_PADDING_Y, // py-2 = 8px (ditingkatkan sedikit)
                }}
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
