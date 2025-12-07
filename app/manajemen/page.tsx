// src/app/manajemen/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Navbar from "@/src/components/Navbar"; // Pastikan path benar
import SearchBar from "@/src/components/SearchBar"; // Pastikan path benar
import ImageUpload from "@/src/components/ImageUpload"; // Pastikan path benar
import type { Item, ItemFormData } from "@/app/types"; // Pastikan tipe terdefinisi
import {
  getTools,
  createTool,
  updateTool,
  deleteTool,
} from "@/src/actions/toolActions"; // Fixed import path from @/src/src/actions to @/src/actions

const CATEGORY_OPTIONS = [
  "Mikrokontroler",
  "Kabel",
  "Resistor",
  "Kapasitor",
  "Sensor",
  "Aktuator",
  "Lain-lain",
];

export default function ManajemenPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<ItemFormData>({
    name: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    try {
      console.log("[v0] Fetching items from database...");
      const data = await getTools();
      console.log("[v0] Items fetched successfully:", data);
      setItems(data as Item[]);
    } catch (error: any) {
      console.error("[v0] Error fetching items:", error);
      alert("Gagal memuat data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteItem = async (id: number) => {
    if (
      window.confirm(
        "Yakin ingin menghapus barang ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      try {
        await deleteTool(id); // <-- Panggil Server Action
        alert("Barang berhasil dihapus!");
        await fetchItems(); // Refresh data
      } catch (error: any) {
        alert("Gagal menghapus barang: " + error.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.stock) {
      alert("Nama Barang dan Stok wajib diisi!");
      return;
    }

    try {
      console.log("[v0] Submitting form data:", formData);
      if (editingItem && editingItem.id) {
        console.log("[v0] Updating tool with ID:", editingItem.id);
        await updateTool(editingItem.id, formData);
        console.log("[v0] Tool updated successfully");
        alert("Barang berhasil diupdate!");
      } else {
        console.log("[v0] Creating new tool");
        await createTool(formData);
        console.log("[v0] Tool created successfully");
        alert("Barang berhasil ditambahkan!");
      }

      await fetchItems();
      setShowModal(false);
    } catch (error: any) {
      console.error("[v0] Error submitting form:", error);
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "",
      stock: "",
      description: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      stock: item.stock.toString(),
      description: item.description,
      image: item.image,
    });
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-xl font-semibold">
        Memuat data manajemen...
      </div>
    );
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manajemen Barang</h1>
          <button
            onClick={handleAddItem}
            className="btn-success flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tambah Barang
          </button>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={() => console.log("Search:", searchQuery)}
        />

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Nama Barang
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center z-50 p-4">
            {" "}
            {/* Changed backdrop from bg-gray-900 bg-opacity-40 to bg-gray-400 bg-opacity-30 for lighter overlay */}
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingItem ? "Edit Barang" : "Tambah Barang Baru"}
              </h2>

              <div className="space-y-4">
                <ImageUpload
                  value={formData.image}
                  onChange={(value) =>
                    setFormData({ ...formData, image: value })
                  }
                />

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="Masukkan nama barang"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="input-field cursor-pointer"
                  >
                    <option value="">Pilih Kategori</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Stok
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="input-field"
                    placeholder="Masukkan jumlah stok"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="input-field"
                    placeholder="Masukkan deskripsi barang"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 btn-secondary py-3 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 btn-primary py-3 font-semibold"
                  >
                    {editingItem ? "Update" : "Tambah"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
