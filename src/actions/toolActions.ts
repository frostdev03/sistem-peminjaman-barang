// src/actions/toolActions.ts

"use server"; // Wajib ada untuk Server Actions

import { prisma } from "@/lib/prisma"; // Sesuaikan path jika prisma.ts Anda tidak di src/lib
import { Item, BorrowFormData, ItemFormData, BorrowRecord } from "@/app/types";

// --- FUNGSI TOOLS (MANAJEMEN & PEMINJAMAN) ---

// Mengambil semua barang
export async function getTools(): Promise<Item[]> {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { name: "asc" },
    });

    // Mapping dari Model Tool (DB) ke Interface Item (FE)
    return tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      stock: tool.quantity,
      borrowed: tool.borrowed,
      image: tool.imageUrl ?? "",
      category: "Umum", // Default value karena tidak ada di DB
      description: "Tidak ada deskripsi.", // Default value karena tidak ada di DB
    }));
  } catch (error) {
    console.error("Database Error (getTools):", error);
    throw new Error("Gagal mengambil data barang dari database.");
  }
}

// Menambah barang baru
export async function createTool(formData: ItemFormData) {
  const data = {
    name: formData.name,
    quantity: parseInt(formData.stock),
    borrowed: 0,
    imageUrl: formData.image || null,
  };

  if (isNaN(data.quantity)) {
    throw new Error("Stok harus berupa angka.");
  }

  try {
    return await prisma.tool.create({ data });
  } catch (error) {
    console.error("Database Error (createTool):", error);
    throw new Error("Gagal menambahkan barang baru.");
  }
}

// Memperbarui barang
export async function updateTool(id: number, formData: ItemFormData) {
  const data = {
    name: formData.name,
    quantity: parseInt(formData.stock),
    imageUrl: formData.image || null,
  };

  if (isNaN(data.quantity)) {
    throw new Error("Stok harus berupa angka.");
  }

  try {
    return await prisma.tool.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Database Error (updateTool):", error);
    throw new Error("Gagal memperbarui data barang.");
  }
}

// Menghapus barang
export async function deleteTool(id: number) {
  try {
    // Hapus histori terkait sebelum menghapus tool (jika ada relasi cascade)
    // Untuk model Anda saat ini, kita hanya akan menghapus tool.
    return await prisma.tool.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Database Error (deleteTool):", error);
    throw new Error(
      "Gagal menghapus barang. Pastikan barang tidak sedang dipinjam."
    );
  }
}

// --- FUNGSI HISTORY (PEMINJAMAN) ---

// Mencatat peminjaman baru
export async function createBorrowRecord(
  toolId: number,
  qty: number,
  formData: BorrowFormData
) {
  try {
    // Jalankan sebagai transaksi untuk memastikan update stok dan catatan history berhasil
    return await prisma.$transaction(async (tx) => {
      // Update Tool: kurangi stok dan/atau tambah borrowed
      const tool = await tx.tool.update({
        where: { id: toolId },
        data: {
          borrowed: { increment: qty },
        },
      });

      // Validasi sederhana setelah update
      if (tool.quantity < tool.borrowed) {
        throw new Error("Stok tidak mencukupi untuk dipinjam.");
      }

      // Buat catatan History
      const newHistory = await tx.history.create({
        data: {
          toolId,
          toolName: tool.name,
          qty,
          nim: formData.nim,
          borrower: formData.name,
          phone: formData.phone,
        },
      });

      return newHistory;
    });
  } catch (error: any) {
    console.error("Database Error (createBorrowRecord):", error);
    // Tampilkan pesan error yang lebih mudah dipahami
    throw new Error(error.message || "Gagal melakukan peminjaman.");
  }
}

// Mengambil semua riwayat peminjaman
export async function getBorrowHistory(): Promise<BorrowRecord[]> {
  try {
    const historyRecords = await prisma.history.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Mapping dari Model History (DB) ke Interface BorrowRecord (FE)
    return historyRecords.map((record) => ({
      id: record.id,
      nim: record.nim,
      name: record.borrower,
      phone: record.phone ?? "",
      item: record.toolName,
      qty: record.qty,
      // Format tanggal ke string sederhana YYYY-MM-DD
      borrowDate: record.createdAt.toISOString().split("T")[0],
      // LOGIC PENGEMBALIAN SEMENTARA:
      // Karena model History tidak punya field 'returnDate', kita gunakan '-' sebagai 'Belum Kembali'.
      // Di sistem riil, Anda perlu menambahkan field 'isReturned: Boolean' atau 'returnDate: DateTime' ke model History.
      returnDate: "-",
    }));
  } catch (error) {
    console.error("Database Error (getBorrowHistory):", error);
    throw new Error("Gagal mengambil data riwayat peminjaman.");
  }
}
