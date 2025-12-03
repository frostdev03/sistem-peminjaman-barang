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

"use client";

import Image from "next/image";
import { Item } from "@/app/types";

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  return (
    <div
      onClick={() => onClick(item)}
      className="card cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="h-48 mb-4 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden relative">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-xl font-bold mb-2 truncate">{item.name}</h3>
        <p className="text-gray-600 mb-2">{item.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Stok: {item.stock}</span>
          <span className="text-blue-600 font-semibold">Lihat Detail →</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
