// src/actions/toolActions.ts

"use server"; // Wajib ada untuk Server Actions

import { prisma } from "@/lib/prisma"; // Sesuaikan path jika prisma.ts Anda tidak di src/lib
import type {
  Item,
  BorrowFormData,
  ItemFormData,
  BorrowRecord,
} from "@/app/types";

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
      category: tool.category || "Umum",
      description: tool.description || "Tidak ada deskripsi.",
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
    category: formData.category || "Lain-lain", // include category
    description: formData.description || "",
    quantity: Number.parseInt(formData.stock),
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
    category: formData.category || "Lain-lain", // include category
    description: formData.description || "",
    quantity: Number.parseInt(formData.stock),
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
    return await prisma.$transaction(async (tx) => {
      const tool = await tx.tool.update({
        where: { id: toolId },
        data: {
          borrowed: { increment: qty },
        },
      });

      if (tool.quantity < tool.borrowed) {
        throw new Error("Stok tidak mencukupi untuk dipinjam.");
      }

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
    throw new Error(error.message || "Gagal melakukan peminjaman.");
  }
}

// Mengambil semua riwayat peminjaman
export async function getBorrowHistory(): Promise<BorrowRecord[]> {
  try {
    const historyRecords = await prisma.history.findMany({
      orderBy: { createdAt: "desc" },
    });

    return historyRecords.map((record) => ({
      id: record.id,
      nim: record.nim,
      name: record.borrower,
      phone: record.phone ?? "",
      item: record.toolName,
      qty: record.qty,
      borrowDate: record.createdAt.toISOString().split("T")[0],
      returnDate: record.isReturned ? "Dikembalikan" : "-",
    }));
  } catch (error) {
    console.error("Database Error (getBorrowHistory):", error);
    throw new Error("Gagal mengambil data riwayat peminjaman.");
  }
}

export async function updateBorrowRecord(
  id: number,
  updates: Partial<BorrowRecord>
) {
  try {
    // First, get the current record to know the tool and quantity
    const currentRecord = await prisma.history.findUnique({
      where: { id },
    });

    if (!currentRecord) {
      throw new Error("Catatan peminjaman tidak ditemukan.");
    }

    // Check if we're marking as returned (transitioning from not returned to returned)
    const isMarkingAsReturned =
      !currentRecord.isReturned && updates.returnDate === "Dikembalikan";

    return await prisma.$transaction(async (tx) => {
      // If marking as returned, restore the stock
      if (isMarkingAsReturned) {
        await tx.tool.update({
          where: { id: currentRecord.toolId },
          data: {
            borrowed: { decrement: currentRecord.qty },
          },
        });
      }

      // Update the history record
      return await tx.history.update({
        where: { id },
        data: {
          ...(updates.nim && { nim: updates.nim }),
          ...(updates.name && { borrower: updates.name }),
          ...(updates.phone && { phone: updates.phone }),
          ...(updates.item && { toolName: updates.item }),
          ...(updates.qty && { qty: updates.qty }),
          ...(updates.returnDate && {
            isReturned: updates.returnDate === "Dikembalikan",
            returnedAt:
              updates.returnDate === "Dikembalikan" ? new Date() : null,
          }),
        },
      });
    });
  } catch (error) {
    console.error("Database Error (updateBorrowRecord):", error);
    throw new Error("Gagal memperbarui data peminjaman.");
  }
}
