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
import { Package } from "lucide-react";

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const availableStock = item.stock - item.borrowed;
  const isOutOfStock = availableStock === 0;

  return (
    <div
      onClick={() => onClick(item)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Stok Habis</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
          <Package className="w-4 h-4" />
          {item.category}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Stok Tersedia</p>
            <p
              className={`text-lg font-bold ${
                isOutOfStock
                  ? "text-red-600"
                  : availableStock < 5
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {availableStock}
            </p>
          </div>
          <span className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1">
            Lihat Detail
            <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
