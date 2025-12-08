// "use client";

// import Image from "next/image";
// import { Item } from "@/app/types";
// import { Zap } from "lucide-react"; // Menambahkan ikon

// interface ItemCardProps {
//   item: Item;
//   onClick: (item: Item) => void;
//   // DIPERBAIKI: Tambahkan prop availableStock
//   availableStock: number;
// }

// const ItemCard = ({ item, onClick, availableStock }: ItemCardProps) => {
//   const isAvailable = availableStock > 0;

//   // Menentukan warna badge stok
//   const stockBadgeClass = isAvailable
//     ? "bg-green-100 text-green-700 border-green-200"
//     : "bg-red-100 text-red-700 border-red-200";

//   return (
//     <div
//       onClick={() => isAvailable && onClick(item)} // Hanya bisa diklik jika tersedia
//       // Styling yang lebih rapi: border, shadow, dan hover effect
//       className={`
//         bg-white
//         rounded-xl
//         shadow-lg
//         overflow-hidden
//         transition
//         duration-300
//         ${
//           isAvailable
//             ? "cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
//             : "opacity-70 cursor-not-allowed"
//         }
//       `}
//     >
//       {/* Container Konten */}
//       <div className="p-4 sm:p-5">
//         {/* Kontainer Gambar dengan Badge Status */}
//         <div className="h-48 mb-4 relative rounded-lg overflow-hidden">
//           <Image
//             src={item.image}
//             alt={item.name}
//             fill
//             className="object-cover transition duration-500 group-hover:scale-105"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//           {/* Badge Stok di Kanan Atas */}
//           <span
//             className={`
//             absolute top-3 right-3
//             px-3 py-1
//             text-xs font-semibold
//             rounded-full
//             border
//             ${stockBadgeClass}
//           `}
//           >
//             {isAvailable ? `${availableStock} Tersedia` : "Habis"}
//           </span>
//         </div>

//         {/* Detail Teks */}
//         <h3 className="text-xl font-extrabold mb-1 truncate text-gray-800">
//           {item.name}
//         </h3>
//         <p className="text-sm font-medium text-blue-600 mb-3">
//           {item.category}
//         </p>

//         {/* Footer Aksi */}
//         <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//           <span className="text-xs text-gray-500 flex items-center">
//             <Zap className="w-3 h-3 mr-1 text-gray-400" />
//             Total: {item.stock} unit
//           </span>

//           {isAvailable ? (
//             <span className="text-blue-600 font-bold flex items-center text-sm transition hover:text-blue-800">
//               Lihat & Pinjam →
//             </span>
//           ) : (
//             <span className="text-red-500 font-bold text-sm">
//               Tidak Dapat Dipinjam
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemCard;

"use client";

import Image from "next/image";
import type { Item } from "@/app/types";
import { Package, TrendingUp } from "lucide-react";

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
  availableStock: number;
}

const ItemCard = ({ item, onClick, availableStock }: ItemCardProps) => {
  const isAvailable = availableStock > 0;
  const stockPercentage = Math.round((availableStock / item.stock) * 100);

  const stockBadgeClass = isAvailable
    ? "bg-emerald-100 text-emerald-700"
    : "bg-red-100 text-red-700";

  return (
    <div
      onClick={() => isAvailable && onClick(item)}
      className={`
        group bg-white rounded-2xl shadow-md hover:shadow-xl
        transition-all duration-300 overflow-hidden
        border border-gray-100
        ${
          isAvailable
            ? "cursor-pointer hover:-translate-y-2"
            : "opacity-60 cursor-not-allowed"
        }
      `}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Stock Badge */}
        <div
          className={`
            absolute top-4 right-4
            px-3 py-1 rounded-full text-xs font-bold
            ${stockBadgeClass}
            backdrop-blur-sm bg-opacity-90
          `}
        >
          {isAvailable ? `${availableStock} Ada` : "Habis"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {item.name}
        </h3>

        <p className="text-sm text-blue-600 font-medium mb-4">
          {item.category}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Package className="w-3 h-3" />
              Total: {item.stock}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {stockPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {isAvailable ? (
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 group">
            <span>Pinjam Sekarang</span>
            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-500 font-semibold py-3 rounded-lg cursor-not-allowed"
          >
            Tidak Tersedia
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
