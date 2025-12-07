"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, X } from "lucide-react"; // Mengganti ArrowLeft dengan X (Close)
import Image from "next/image";
import Navbar from "@/src/components/Navbar";
import SearchBar from "@/src/components/SearchBar";
import ItemCard from "@/src/components/ItemCard";
import { Item, BorrowFormData } from "@/app/types";
import { getTools, createBorrowRecord } from "@/src/actions/toolActions";

// --- Styling Helpers ---
const classNames = {
  card: "bg-white shadow-xl rounded-xl p-6 lg:p-8",
  inputField:
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150",
  btnPrimary:
    "w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg",
  btnSecondary:
    "flex-1 py-3 border border-gray-300 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition duration-200",
  qtyBtn:
    "w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-150",
};
// -----------------------

// ==============================================================================
// 📦 KOMPONEN MODAL BARU (POPUP PEMINJAMAN)
// ==============================================================================

interface BorrowModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: BorrowFormData, quantity: number) => Promise<void>;
  availableStock: number;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
  availableStock,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BorrowFormData>({
    nim: "",
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setShowForm(false);
      setFormData({ nim: "", name: "", phone: "" });
    }
  }, [isOpen]);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= availableStock) {
      setQuantity(newQty);
    }
  };

  const handlePinjam = () => {
    if (quantity > availableStock) {
      alert(`Stok tidak mencukupi! Tersedia: ${availableStock}`);
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!formData.nim || !formData.name || !formData.phone) {
      alert("Mohon lengkapi semua data!");
      return;
    }
    setIsSubmitting(true);
    try {
      await onConfirm(formData, quantity);
      onClose(); // Tutup modal setelah berhasil
    } catch (error) {
      // alert error di handle oleh parent/onConfirm
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQtyMax = quantity >= availableStock;
  const isQtyMin = quantity <= 1;
  const isAvailable = availableStock > 0;

  if (!isOpen) return null;

  return (
    // Backdrop gelap
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* Modal Box Floating */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative overflow-hidden transform transition-all duration-300 scale-100"
        style={{ height: "auto", maxHeight: "90vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10 p-2 rounded-full bg-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
          {/* KIRI: Gambar dan Detail (Col 2/5) */}
          <div className="lg:col-span-2 p-8 bg-gray-50 border-r flex flex-col justify-center items-center">
            <div className="w-full h-64 mb-4 relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              {item.name}
            </h2>
            <p className="text-md font-medium text-blue-600 mb-2">
              {item.category}
            </p>
            <p className="text-sm text-gray-700 text-center">
              {item.description}
            </p>
            <div className="mt-4 p-2 bg-blue-100 rounded-lg w-full text-center">
              <p className="text-sm font-bold text-gray-800">
                Stok Tersedia:
                <span
                  className={`ml-2 ${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {availableStock} / {item.stock}
                </span>
              </p>
            </div>
          </div>

          {/* KANAN: Kontrol Kuantitas & Form (Col 3/5) */}
          <div className="lg:col-span-3 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {showForm ? "Masukkan Data Peminjam" : "Tentukan Jumlah Pinjam"}
              </h3>

              {/* Kontrol Kuantitas (Jika belum menampilkan form) */}
              {!showForm && (
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                  <span className="font-semibold text-gray-700 mr-4">
                    Jumlah:
                  </span>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className={classNames.qtyBtn}
                    disabled={isQtyMin || !isAvailable}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-extrabold w-12 text-center text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className={classNames.qtyBtn}
                    disabled={isQtyMax || !isAvailable}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Form Peminjaman */}
              {showForm && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 font-medium">
                    Anda akan meminjam **{item.name}** sebanyak **{quantity}**
                    unit.
                  </div>
                  {/* Input NIM */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      NIM <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nim}
                      onChange={(e) =>
                        setFormData({ ...formData, nim: e.target.value })
                      }
                      className={classNames.inputField}
                      placeholder="Masukkan NIM Anda"
                      required
                    />
                  </div>
                  {/* Input Nama */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={classNames.inputField}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  {/* Input Telepon */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={classNames.inputField}
                      placeholder="Contoh: 081234567890"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Aksi di bagian bawah kanan */}
            <div className="flex gap-4 pt-6 mt-auto">
              {showForm && (
                <button
                  onClick={() => setShowForm(false)}
                  className={classNames.btnSecondary}
                  disabled={isSubmitting}
                >
                  Kembali
                </button>
              )}
              <button
                onClick={showForm ? handleSubmit : handlePinjam}
                className={classNames.btnPrimary + " flex-1"}
                disabled={!isAvailable || isSubmitting}
              >
                {isSubmitting
                  ? "Memproses..."
                  : showForm
                  ? "Konfirmasi Peminjaman"
                  : isAvailable
                  ? "Pinjam Sekarang"
                  : "Tidak Tersedia"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 🏢 KOMPONEN UTAMA (PeminjamanPage)
// ==============================================================================

export default function PeminjamanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  // selectedItem sekarang hanya untuk memicu modal
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  // quantity dan showForm dipindahkan ke Modal
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getTools();
        setItems(data as Item[]);
      } catch (error: any) {
        alert("Gagal memuat data: " + error.message);
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

  const handleItemCardClick = (item: Item) => {
    setSelectedItem(item); // Membuka Modal
  };

  const handleCloseModal = () => {
    setSelectedItem(null); // Menutup Modal
  };

  const handleConfirmBorrow = async (
    formData: BorrowFormData,
    quantity: number
  ) => {
    if (!selectedItem || !selectedItem.id) return;

    setIsSubmitting(true);

    try {
      await createBorrowRecord(selectedItem.id, quantity, formData);
      alert("Peminjaman berhasil dikonfirmasi!");

      // Refresh data setelah peminjaman berhasil
      const refreshedData = await getTools();
      setItems(refreshedData as Item[]);
    } catch (error: any) {
      alert("Gagal melakukan peminjaman: " + error.message);
      throw error; // Re-throw agar modal tahu konfirmasi gagal
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-600">
          Memuat data barang...
        </div>
      </div>
    );
  }

  // Menentukan padding horizontal untuk konten utama (agar tidak mepet kiri/kanan)
  const CONTENT_PADDING_X = "32px"; // Nilai yang lebih besar, misal 32px

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div
        className="container mx-auto py-8"
        style={{
          paddingLeft: CONTENT_PADDING_X,
          paddingRight: CONTENT_PADDING_X,
        }}
      >
        {/* JUDUL: Bold dan Jarak */}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
          Daftar Barang Tersedia
        </h1>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => console.log("Search:", searchQuery)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const availableStock = item.stock - item.borrowed;
            return (
              <ItemCard
                key={item.id}
                item={item}
                onClick={handleItemCardClick}
                availableStock={availableStock} // Pastikan ini dikirim
              />
            );
          })}
          {filteredItems.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">
              Tidak ada barang yang sesuai dengan pencarian Anda.
            </p>
          )}
        </div>
      </div>

      {/* MODAL PEMINJAMAN (HANYA MUNCUL JIKA selectedItem ada) */}
      {selectedItem && (
        <BorrowModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={handleCloseModal}
          onConfirm={handleConfirmBorrow}
          availableStock={selectedItem.stock - selectedItem.borrowed}
        />
      )}
    </div>
  );
}
