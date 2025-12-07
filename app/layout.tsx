// // // app/layout.tsx
// // import "./globals.css";
// // export const metadata = { title: "Peminjaman Alat" };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="id">
// //       <body>
// //         <div className="min-h-screen bg-gray-50">
// //           <nav className="bg-white border-b p-4">
// //             <div className="container mx-auto flex items-center gap-4">
// //               <a href="/" className="font-bold">
// //                 LabLoan
// //               </a>
// //               <a href="/peminjaman" className="ml-4 text-sm">
// //                 Peminjaman
// //               </a>
// //               <a href="/manajemen" className="ml-4 text-sm">
// //                 Manajemen
// //               </a>
// //               <a href="/riwayat" className="ml-4 text-sm">
// //                 Riwayat
// //               </a>
// //             </div>
// //           </nav>
// //           <main className="container mx-auto p-4">{children}</main>
// //         </div>
// //       </body>
// //     </html>
// //   );
// // }

// // src/app/layout.tsx

// import type { Metadata } from "next";
// // Import globals.css Anda di sini, pastikan path-nya benar
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Peminjaman Alat & Bahan",
//   description: "Sistem Peminjaman Alat dan Bahan Laboratorium",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="id">
//       <body className="antialiased">{children}</body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peminjaman Alat & Bahan",
  description:
    "Sistem Peminjaman Alat dan Bahan Laboratorium - Modern Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
