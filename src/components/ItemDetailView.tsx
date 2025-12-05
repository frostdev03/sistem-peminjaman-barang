// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { ArrowLeft, Plus, Minus } from "lucide-react";
// import BorrowForm from "@/src/components/BorrowForm";
// import { Item, BorrowFormData } from "@/app/types";
// import { createBorrowRecord } from "@/src/actions/toolActions";

// interface ItemDetailViewProps {
//   item: Item;
//   onBack: () => void;
//   onSuccess: () => void;
// }

// export default function ItemDetailView({
//   item,
//   onBack,
//   onSuccess,
// }: ItemDetailViewProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const availableStock = item.stock - item.borrowed;

//   const handleQuantityChange = (delta: number) => {
//     const newQty = quantity + delta;
//     if (newQty >= 1 && newQty <= availableStock) {
//       setQuantity(newQty);
//     }
//   };

//   const handlePinjam = () => {
//     if (quantity > availableStock) {
//       alert("Stok tidak mencukupi!");
//       return;
//     }
//     setShowForm(true);
//   };

//   const handleSubmitBorrow = async (formData: BorrowFormData) => {
//     if (!item.id) return;

//     try {
//       setIsSubmitting(true);
//       await createBorrowRecord(item.id, quantity, formData);
//       alert("Peminjaman berhasil dikonfirmasi!");
//       onSuccess();
//     } catch (error: any) {
//       alert("Gagal melakukan peminjaman: " + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancelForm = () => {
//     setShowForm(false);
//   };

//   return (
//     <div className="card p-8 max-w-2xl mx-auto">
//       <button
//         onClick={onBack}
//         className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-700 transition font-medium"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         Kembali ke daftar
//       </button>

//       <div className="text-center mb-8">
//         <div className="w-64 h-64 mx-auto mb-6 bg-gray-100 rounded-lg overflow-hidden relative">
//           <Image
//             src={item.image}
//             alt={item.name}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//         </div>
//         <h2 className="text-3xl font-bold mb-2 text-gray-800">{item.name}</h2>
//         <p className="text-gray-600 text-lg">{item.category}</p>
//       </div>

//       <div className="mb-8">
//         <p className="text-gray-700 mb-4">{item.description}</p>
//         <div className="bg-blue-50 p-4 rounded-lg">
//           <p className="text-lg font-semibold text-gray-800">
//             <span className="text-blue-600">
//               Stok tersedia: {availableStock}
//             </span>
//             <span className="text-gray-500 text-sm ml-2">
//               (Total: {item.stock})
//             </span>
//           </p>
//           {availableStock === 0 && (
//             <p className="text-red-600 text-sm mt-2">
//               Stok habis, barang tidak dapat dipinjam saat ini
//             </p>
//           )}
//         </div>
//       </div>

//       {!showForm ? (
//         <div className="space-y-6">
//           <div className="flex items-center justify-center gap-6">
//             <button
//               onClick={() => handleQuantityChange(-1)}
//               disabled={quantity <= 1}
//               className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Minus className="w-5 h-5" />
//             </button>
//             <span className="text-4xl font-bold w-20 text-center text-gray-800">
//               {quantity}
//             </span>
//             <button
//               onClick={() => handleQuantityChange(1)}
//               disabled={quantity >= availableStock}
//               className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-5 h-5" />
//             </button>
//           </div>
//           <button
//             onClick={handlePinjam}
//             disabled={availableStock === 0}
//             className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {availableStock === 0 ? "Stok Habis" : "Pinjam Sekarang"}
//           </button>
//         </div>
//       ) : (
//         <BorrowForm
//           quantity={quantity}
//           itemName={item.name}
//           onSubmit={handleSubmitBorrow}
//           onCancel={handleCancelForm}
//           isSubmitting={isSubmitting}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import BorrowForm from "./BorrowForm";
import { Item, BorrowFormData } from "@/app/types";
import { createBorrowRecord } from "@/src/actions/toolActions";

interface ItemDetailViewProps {
  item: Item;
  onBack: () => void;
  onSuccess: () => void;
}

export default function ItemDetailView({
  item,
  onBack,
  onSuccess,
}: ItemDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableStock = item.stock - item.borrowed;

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= availableStock) {
      setQuantity(newQty);
    }
  };

  const handlePinjam = () => {
    if (quantity > availableStock) {
      alert("Stok tidak mencukupi!");
      return;
    }
    setShowForm(true);
  };

  const handleSubmitBorrow = async (formData: BorrowFormData) => {
    if (!item.id) return;

    try {
      setIsSubmitting(true);
      await createBorrowRecord(item.id, quantity, formData);
      alert("Peminjaman berhasil dikonfirmasi!");
      onSuccess();
    } catch (error: any) {
      alert("Gagal melakukan peminjaman: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-700 transition font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Kembali ke daftar
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div>
            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3 text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600 text-lg mb-4">{item.category}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Ketersediaan Stok</p>
              <p className="text-2xl font-bold text-gray-800">
                <span
                  className={
                    availableStock === 0
                      ? "text-red-600"
                      : availableStock < 5
                      ? "text-orange-600"
                      : "text-green-600"
                  }
                >
                  {availableStock}
                </span>
                <span className="text-gray-500 text-lg ml-2">
                  / {item.stock}
                </span>
              </p>
              {availableStock === 0 && (
                <p className="text-red-600 text-sm mt-2">
                  Stok habis, barang tidak dapat dipinjam saat ini
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Section */}
        {!showForm ? (
          <div className="border-t pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Jumlah</p>
                <span className="text-5xl font-bold text-gray-800">
                  {quantity}
                </span>
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= availableStock}
                className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={handlePinjam}
              disabled={availableStock === 0}
              className="w-full py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {availableStock === 0 ? "Stok Habis" : "Pinjam Sekarang"}
            </button>
          </div>
        ) : (
          <div className="border-t pt-8">
            <BorrowForm
              quantity={quantity}
              itemName={item.name}
              onSubmit={handleSubmitBorrow}
              onCancel={handleCancelForm}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
