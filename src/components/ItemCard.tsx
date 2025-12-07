// // src/components/ItemCard.tsx

// import Image from "next/image";
// import { Item } from "@/app/types"; // Import tipe Item

// interface ItemCardProps {
//   item: Item;
//   onClick: (item: Item) => void;
// }

// export default function ItemCard({ item, onClick }: ItemCardProps) {
//   return (
//     <div
//       onClick={() => onClick(item)}
//       className="card cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
//     >
//       <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-gray-100">
//         <Image
//           src={item.image}
//           alt={item.name}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, 33vw"
//         />
//       </div>
//       <h3 className="text-xl font-semibold mb-1 truncate">{item.name}</h3>
//       <p className="text-sm text-gray-500 mb-3">{item.category}</p>
//       <div className="flex justify-between items-center">
//         <span className="text-lg font-bold text-blue-600">
//           Stok: {item.stock}
//         </span>
//         <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition">
//           Lihat Detail
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/ItemCard.tsx

// "use client";

// import Image from "next/image";
// import { Item } from "@/app/types";

// interface ItemCardProps {
//   item: Item;
//   onClick: (item: Item) => void;
// }

// const ItemCard = ({ item, onClick }: ItemCardProps) => {
//   return (
//     <div
//       onClick={() => onClick(item)}
//       className="card cursor-pointer overflow-hidden"
//     >
//       <div className="p-6">
//         <div className="h-48 mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden relative">
//           <Image
//             src={item.image}
//             alt={item.name}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//         </div>
//         <h3 className="text-xl font-bold mb-2 truncate">{item.name}</h3>
//         <p className="text-gray-600 mb-2">{item.category}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">Stok: {item.stock}</span>
//           <span className="text-blue-600 font-semibold">Lihat Detail →</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemCard;

"use client";

import Image from "next/image";
import { Item } from "@/app/types";
import { Zap } from "lucide-react"; // Menambahkan ikon

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
  // DIPERBAIKI: Tambahkan prop availableStock
  availableStock: number;
}

const ItemCard = ({ item, onClick, availableStock }: ItemCardProps) => {
  const isAvailable = availableStock > 0;

  // Menentukan warna badge stok
  const stockBadgeClass = isAvailable
    ? "bg-green-100 text-green-700 border-green-200"
    : "bg-red-100 text-red-700 border-red-200";

  return (
    <div
      onClick={() => isAvailable && onClick(item)} // Hanya bisa diklik jika tersedia
      // Styling yang lebih rapi: border, shadow, dan hover effect
      className={`
        bg-white 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        transition 
        duration-300 
        ${
          isAvailable
            ? "cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
            : "opacity-70 cursor-not-allowed"
        }
      `}
    >
      {/* Container Konten */}
      <div className="p-4 sm:p-5">
        {/* Kontainer Gambar dengan Badge Status */}
        <div className="h-48 mb-4 relative rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Badge Stok di Kanan Atas */}
          <span
            className={`
            absolute top-3 right-3 
            px-3 py-1 
            text-xs font-semibold 
            rounded-full 
            border
            ${stockBadgeClass}
          `}
          >
            {isAvailable ? `${availableStock} Tersedia` : "Habis"}
          </span>
        </div>

        {/* Detail Teks */}
        <h3 className="text-xl font-extrabold mb-1 truncate text-gray-800">
          {item.name}
        </h3>
        <p className="text-sm font-medium text-blue-600 mb-3">
          {item.category}
        </p>

        {/* Footer Aksi */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center">
            <Zap className="w-3 h-3 mr-1 text-gray-400" />
            Total: {item.stock} unit
          </span>

          {isAvailable ? (
            <span className="text-blue-600 font-bold flex items-center text-sm transition hover:text-blue-800">
              Lihat & Pinjam →
            </span>
          ) : (
            <span className="text-red-500 font-bold text-sm">
              Tidak Dapat Dipinjam
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
