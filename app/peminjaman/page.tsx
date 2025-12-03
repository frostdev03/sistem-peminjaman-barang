"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import Navbar from "@/src/components/Navbar";
import SearchBar from "@/src/components/SearchBar";
import ItemCard from "@/src/components/ItemCard";
import { Item, BorrowFormData } from "@/app/types";
import { getTools, createBorrowRecord } from "@/src/actions/toolActions";

// const initialItems: Item[] = [
//   {
//     id: 1,
//     name: "Laptop Asus ROG",
//     category: "Elektronik",
//     stock: 5,
//     image: "",
//     description: "Laptop gaming untuk keperluan programming dan desain",
//   },
//   {
//     id: 2,
//     name: "Proyektor Epson",
//     category: "Elektronik",
//     stock: 3,
//     image: "",
//     description: "Proyektor HD untuk presentasi",
//   },
//   {
//     id: 3,
//     name: "Kamera DSLR Canon",
//     category: "Elektronik",
//     stock: 2,
//     image: "",
//     description: "Kamera profesional untuk dokumentasi",
//   },
// ];

export default function PeminjamanPage() {
  // const [items] = useState<Item[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BorrowFormData>({
    nim: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getTools(); // <-- Panggil Server Action
        setItems(data as Item[]);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowForm(false);
  };

  const handleQuantityChange = (delta: number) => {
    if (!selectedItem) return;
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= selectedItem.stock) {
      setQuantity(newQty);
    }
  };

  const handlePinjam = () => {
    if (!selectedItem) return;
    if (quantity > selectedItem.stock) {
      alert("Stok tidak mencukupi!");
      return;
    }
    setShowForm(true);
  };

  // const handleSubmitPinjam = () => {
  //   if (!formData.nim || !formData.name || !formData.phone) {
  //     alert("Mohon lengkapi semua data!");
  //     return;
  //   }

  //   // TODO: API call untuk submit peminjaman
  //   console.log("Submit peminjaman:", {
  //     item: selectedItem,
  //     quantity,
  //     ...formData,
  //   });

  //   alert("Peminjaman berhasil!");
  //   setShowForm(false);
  //   setSelectedItem(null);
  //   setFormData({ nim: "", name: "", phone: "" });
  // };

  const handleSubmitPinjam = async () => {
    if (!selectedItem || !selectedItem.id) return;
    if (!formData.nim || !formData.name || !formData.phone) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    try {
      await createBorrowRecord(selectedItem.id, quantity, formData); // <-- Panggil Server Action
      alert("Peminjaman berhasil dikonfirmasi!");

      // Refresh data setelah peminjaman berhasil
      const refreshedData = await getTools();
      setItems(refreshedData as Item[]);

      setShowForm(false);
      setSelectedItem(null);
      setFormData({ nim: "", name: "", phone: "" });
    } catch (error: any) {
      alert("Gagal melakukan peminjaman: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-xl font-semibold">
        Memuat data barang...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Daftar Barang</h1>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={() => console.log("Search:", searchQuery)}
        />

        {!selectedItem ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={handleItemClick} />
            ))}
          </div>
        ) : (
          <div className="card p-8 max-w-2xl mx-auto">
            <button
              onClick={() => {
                setSelectedItem(null);
                setShowForm(false);
              }}
              className="text-blue-600 mb-4 hover:underline"
            >
              ← Kembali ke daftar
            </button>

            <div className="text-center mb-6">
              <div className="w-64 h-64 mx-auto mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h2 className="text-3xl font-bold mb-2">{selectedItem.name}</h2>
              <p className="text-gray-600 text-lg">{selectedItem.category}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{selectedItem.description}</p>
              <p className="text-lg font-semibold mt-4">
                {/* Stok tersedia: {selectedItem.stock} */}
                Stok tersedia: {selectedItem.stock - selectedItem.borrowed} /
                Total: {selectedItem.stock}
              </p>
            </div>

            {!showForm ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-3xl font-bold w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handlePinjam}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Pinjam Sekarang
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    NIM
                  </label>
                  <input
                    type="text"
                    value={formData.nim}
                    onChange={(e) =>
                      setFormData({ ...formData, nim: e.target.value })
                    }
                    className="input-field"
                    placeholder="Masukkan NIM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="input-field"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowForm(false)}
                    // Perlu membuat atau menyesuaikan class CSS 'btn-secondary'
                    className="flex-1 btn-secondary py-3 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmitPinjam}
                    // Perlu membuat atau menyesuaikan class CSS 'btn-primary'
                    className="flex-1 btn-primary py-3 font-semibold"
                  >
                    Konfirmasi Peminjaman
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
