// export default function Home() {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Sistem Peminjaman Alat (Lokal)</h1>
//       <p className="mt-2">
//         Klik{" "}
//         <a href="/peminjaman" className="text-blue-600">
//           Peminjaman
//         </a>{" "}
//         untuk mulai.
//       </p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">LabLoan</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <div className="mb-4 inline-block">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Selamat Datang
            </span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Sistem Peminjaman Alat & Bahan
          </h2>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Platform manajemen peminjaman alat laboratorium yang modern,
            efisien, dan mudah digunakan untuk institusi Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/peminjaman"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Mulai Peminjaman
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/manajemen"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Kelola Barang
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: "📋",
                title: "Manajemen Mudah",
                desc: "Kelola barang dengan interface yang intuitif",
              },
              {
                icon: "🔍",
                title: "Pencarian Cepat",
                desc: "Temukan barang yang Anda butuhkan dalam sekejap",
              },
              {
                icon: "📊",
                title: "Riwayat Lengkap",
                desc: "Lacak semua peminjaman dan pengembalian barang",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>
            © 2025 LabLoan - Sistem Peminjaman Alat & Bahan. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
