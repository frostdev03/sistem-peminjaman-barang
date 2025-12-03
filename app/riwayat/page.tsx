// src/app/riwayat/page.tsx

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar"; // Pastikan path benar
import { BorrowRecord } from "@/app/types"; // Pastikan tipe terdefinisi
import { getBorrowHistory } from "@/src/actions/toolActions";

// const initialHistory: BorrowRecord[] = [
//   {
//     id: 1,
//     nim: "12345678",
//     name: "Ahmad Rizki",
//     phone: "081234567890",
//     item: "Laptop Asus ROG",
//     qty: 1,
//     borrowDate: "2024-11-28",
//     returnDate: "2024-11-30",
//   },
//   {
//     id: 2,
//     nim: "87654321",
//     name: "Siti Nurhaliza",
//     phone: "081298765432",
//     item: "Proyektor Epson",
//     qty: 1,
//     borrowDate: "2024-11-27",
//     returnDate: "-",
//   },
//   {
//     id: 3,
//     nim: "11223344",
//     name: "Budi Santoso",
//     phone: "081234556677",
//     item: "Kamera DSLR Canon",
//     qty: 1,
//     borrowDate: "2024-11-25",
//     returnDate: "2024-11-27",
//   },
// ];

export default function RiwayatPage() {
  //   const [history] = useState<BorrowRecord[]>(initialHistory);
  const [history, setHistory] = useState<BorrowRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getBorrowHistory(); // <-- Panggil Server Action
        setHistory(data as BorrowRecord[]);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // FUNGSI UNTUK MENGAMBIL DATA RIWAYAT
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getBorrowHistory(); // <-- Panggil Server Action
        setHistory(data as BorrowRecord[]);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Riwayat Peminjaman</h1>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr
                    key={record.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{record.nim}</td>
                    <td className="px-6 py-4 font-medium">{record.name}</td>
                    <td className="px-6 py-4">{record.phone}</td>
                    <td className="px-6 py-4">{record.item}</td>
                    <td className="px-6 py-4">{record.qty}</td>
                    <td className="px-6 py-4">{record.borrowDate}</td>
                    <td className="px-6 py-4">
                      {/* <span
                        className={
                          record.returnDate === "-"
                            ? "text-orange-600 font-semibold"
                            : ""
                        }
                      >
                        {record.returnDate}
                      </span> */}
                      <span
                        className={
                          record.returnDate === "-"
                            ? "text-orange-600 font-semibold"
                            : "text-green-600"
                        }
                      >
                        {record.returnDate === "-"
                          ? "Belum Kembali"
                          : record.returnDate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
