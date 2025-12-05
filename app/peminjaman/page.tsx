// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Minus, ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import Navbar from "@/src/components/Navbar";
// import SearchBar from "@/src/components/SearchBar";
// import ItemCard from "@/src/components/ItemCard";
// import { Item, BorrowFormData } from "@/app/types";
// import { getTools, createBorrowRecord } from "@/src/actions/toolActions";

// export default function PeminjamanPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedItem, setSelectedItem] = useState<Item | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [items, setItems] = useState<Item[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState<BorrowFormData>({
//     nim: "",
//     name: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const data = await getTools();
//         setItems(data as Item[]);
//       } catch (error: any) {
//         alert(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   const filteredItems = items.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleItemClick = (item: Item) => {
//     setSelectedItem(item);
//     setQuantity(1);
//     setShowForm(false);
//   };

//   const handleQuantityChange = (delta: number) => {
//     if (!selectedItem) return;
//     const availableStock = selectedItem.stock - selectedItem.borrowed;
//     const newQty = quantity + delta;
//     // if (newQty >= 1 && newQty <= selectedItem.stock) {
//     //   setQuantity(newQty);
//     // }
//     if (newQty >= 1 && newQty <= availableStock) {
//       setQuantity(newQty);
//     }
//   };

//   const handlePinjam = () => {
//     if (!selectedItem) return;
//     const availableStock = selectedItem.stock - selectedItem.borrowed;
//     if (quantity > availableStock) {
//       alert("Stok tidak mencukupi!");
//       return;
//     }
//     setShowForm(true);
//   };

//   const handleSubmitPinjam = async () => {
//     if (!selectedItem || !selectedItem.id) return;
//     if (!formData.nim || !formData.name || !formData.phone) {
//       alert("Mohon lengkapi semua data!");
//       return;
//     }

//     try {
//       await createBorrowRecord(selectedItem.id, quantity, formData);
//       alert("Peminjaman berhasil dikonfirmasi!");

//       const refreshedData = await getTools();
//       setItems(refreshedData as Item[]);

//       setShowForm(false);
//       setSelectedItem(null);
//       setFormData({ nim: "", name: "", phone: "" });
//     } catch (error: any) {
//       alert("Gagal melakukan peminjaman: " + error.message);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-lg font-semibold text-gray-700">
//             Memuat data barang...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Daftar Barang</h1>

//         <SearchBar
//           value={searchQuery}
//           onChange={setSearchQuery}
//           onSearch={() => console.log("Search:", searchQuery)}
//         />

//         {/* {!selectedItem ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredItems.map((item) => (
//               <ItemCard key={item.id} item={item} onClick={handleItemClick} />
//             ))} */}
//         {!selectedItem ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {/* 💡 PERBAIKAN GRID: Menggunakan 4 kolom di layar besar (lg) dan 3 kolom di layar sedang (md) */}
//             {filteredItems.map((item) => (
//               <ItemCard key={item.id} item={item} onClick={handleItemClick}
//               // className="h-full"
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="card p-8 max-w-2xl mx-auto">
//             <button
//               onClick={() => {
//                 setSelectedItem(null);
//                 setShowForm(false);
//               }}
//               className="text-blue-600 mb-4 hover:underline"
//             >
//               ← Kembali ke daftar
//             </button>

//             <div className="text-center mb-6">
//               <div className="w-64 h-64 mx-auto mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
//                 <Image
//                   src={selectedItem.image}
//                   alt={selectedItem.name}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               </div>
//               <h2 className="text-3xl font-bold mb-2">{selectedItem.name}</h2>
//               <p className="text-gray-600 text-lg">{selectedItem.category}</p>
//             </div>

//             <div className="mb-6">
//               <p className="text-gray-700">{selectedItem.description}</p>
//               <p className="text-lg font-semibold mt-4">
//                 {/* Stok tersedia: {selectedItem.stock} */}
//                 Stok tersedia: {selectedItem.stock - selectedItem.borrowed} /
//                 Total: {selectedItem.stock}
//               </p>
//             </div>

//             {!showForm ? (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-center gap-4">
//                   <button
//                     onClick={() => handleQuantityChange(-1)}
//                     className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
//                   >
//                     <Minus className="w-5 h-5" />
//                   </button>
//                   <span className="text-3xl font-bold w-16 text-center">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => handleQuantityChange(1)}
//                     className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <button
//                   onClick={handlePinjam}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
//                 >
//                   Pinjam Sekarang
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     NIM
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.nim}
//                     onChange={(e) =>
//                       setFormData({ ...formData, nim: e.target.value })
//                     }
//                     className="input-field"
//                     placeholder="Masukkan NIM"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Nama Lengkap
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="input-field"
//                     placeholder="Masukkan nama lengkap"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Nomor Telepon
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     className="input-field"
//                     placeholder="Masukkan nomor telepon"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setShowForm(false)}
//                     // Perlu membuat atau menyesuaikan class CSS 'btn-secondary'
//                     className="flex-1 btn-secondary py-3 font-semibold"
//                   >
//                     Batal
//                   </button>
//                   <button
//                     onClick={handleSubmitPinjam}
//                     // Perlu membuat atau menyesuaikan class CSS 'btn-primary'
//                     className="flex-1 btn-primary py-3 font-semibold"
//                   >
//                     Konfirmasi Peminjaman
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import SearchBar from "@/src/components/SearchBar";
import ItemCard from "@/src/components/ItemCard";
import ItemDetailView from "@/src/components/ItemDetailView";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import EmptyState from "@/src/components/EmptyState";
import { Item } from "@/app/types";
import { getTools } from "@/src/actions/toolActions";

export default function PeminjamanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const data = await getTools();
      setItems(data as Item[]);
    } catch (error: any) {
      alert("Gagal memuat data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  const handleBorrowSuccess = async () => {
    await fetchItems();
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner message="Memuat data barang..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {!selectedItem ? (
          <>
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
                Daftar Barang
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Pilih barang yang ingin Anda pinjam
              </p>
            </div>

            <div className="mb-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {filteredItems.length === 0 ? (
              <EmptyState
                message="Tidak ada barang yang ditemukan"
                description={
                  searchQuery
                    ? `Tidak ada hasil untuk "${searchQuery}"`
                    : "Belum ada barang yang tersedia"
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={handleItemClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <ItemDetailView
            item={selectedItem}
            onBack={handleBackToList}
            onSuccess={handleBorrowSuccess}
          />
        )}
      </main>
    </div>
  );
}
