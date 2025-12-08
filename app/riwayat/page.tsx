"use client";

import { useState, useEffect } from "react";
import { Edit2, Check } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import { Toast, useToast } from "@/src/components/Toast";
import type { BorrowRecord } from "@/app/types";
import {
  getBorrowHistory,
  updateBorrowRecord,
} from "@/src/actions/toolActions";

export default function RiwayatPage() {
  const [history, setHistory] = useState<BorrowRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BorrowRecord | null>(null);
  const [editFormData, setEditFormData] = useState<BorrowRecord | null>(null);
  const { messages, addToast, removeToast } = useToast();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("[v0] Fetching borrow history...");
        const data = await getBorrowHistory();
        console.log("[v0] Borrow history fetched:", data);
        setHistory(data as BorrowRecord[]);
      } catch (error: any) {
        console.error("[v0] Error fetching history:", error);
        addToast("Gagal memuat riwayat: " + error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [addToast]);

  const handleEditClick = (record: BorrowRecord) => {
    setEditingRecord(record);
    setEditFormData({ ...record });
    setShowEditModal(true);
  };

  const handleMarkReturned = async (record: BorrowRecord) => {
    try {
      console.log("[v0] Marking record as returned:", record.id);
      await updateBorrowRecord(record.id, {
        returnDate: "returned", // Flag to trigger the backend logic
      } as any);
      console.log("[v0] Record marked as returned successfully");

      const data = await getBorrowHistory();
      setHistory(data as BorrowRecord[]);
      addToast(
        "Status berhasil diperbarui menjadi Dikembalikan! Stok barang dikembalikan.",
        "success"
      );
    } catch (error: any) {
      console.error("[v0] Error marking returned:", error);
      addToast("Gagal memperbarui status: " + error.message, "error");
    }
  };

  const handleSaveEdit = async () => {
    if (editFormData && editingRecord) {
      try {
        console.log(
          "[v0] Saving edited record:",
          editingRecord.id,
          editFormData
        );
        await updateBorrowRecord(editingRecord.id, editFormData);
        console.log("[v0] Record saved successfully");

        const data = await getBorrowHistory();
        setHistory(data as BorrowRecord[]);
        setShowEditModal(false);
        addToast("Data berhasil diperbarui!", "success");
      } catch (error: any) {
        console.error("[v0] Error saving edit:", error);
        addToast("Gagal memperbarui data: " + error.message, "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-xl font-semibold">
        Memuat riwayat peminjaman...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toast messages={messages} onRemove={removeToast} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Riwayat Peminjaman</h1>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 w-12">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    NIM
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    No. Telepon
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Barang
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Tgl Pinjam
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Tgl Kembali
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4">{record.nim}</td>
                    <td className="px-6 py-4 font-medium">{record.name}</td>
                    <td className="px-6 py-4">{record.phone}</td>
                    <td className="px-6 py-4">{record.item}</td>
                    <td className="px-6 py-4">{record.qty}</td>
                    <td className="px-6 py-4">{record.borrowDate}</td>
                    <td className="px-6 py-4">{record.returnDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          record.returnDate === "-"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {record.returnDate === "-"
                          ? "Belum Dikembalikan"
                          : "Dikembalikan"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(record)}
                          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                          title="Edit data peminjaman"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMarkReturned(record)}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          title="Tandai sebagai dikembalikan"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Data Peminjaman</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">NIM</label>
                <input
                  type="text"
                  value={editFormData.nim}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, nim: e.target.value })
                  }
                  className="input-field"
                  placeholder="Masukkan NIM"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nama</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="input-field"
                  placeholder="Masukkan nama"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  No. Telepon
                </label>
                <input
                  type="text"
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      phone: e.target.value,
                    })
                  }
                  className="input-field"
                  placeholder="Masukkan no. telepon"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Barang
                </label>
                <input
                  type="text"
                  value={editFormData.item}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, item: e.target.value })
                  }
                  className="input-field"
                  placeholder="Masukkan nama barang"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Jumlah
                </label>
                <input
                  type="number"
                  value={editFormData.qty}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      qty: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  className="input-field"
                  placeholder="Masukkan jumlah"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tgl Pinjam
                </label>
                <input
                  type="text"
                  value={editFormData.borrowDate}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      borrowDate: e.target.value,
                    })
                  }
                  className="input-field"
                  placeholder="Masukkan tanggal pinjam"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tgl Kembali
                </label>
                <input
                  type="text"
                  value={editFormData.returnDate}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      returnDate: e.target.value,
                    })
                  }
                  className="input-field"
                  placeholder="Masukkan tanggal kembali"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 btn-secondary py-3 font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 btn-primary py-3 font-semibold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
