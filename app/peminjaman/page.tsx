"use client";
import { useEffect, useState } from "react";

type Tool = {
  id: number;
  name: string;
  quantity: number;
  borrowed: number;
  imageUrl?: string;
};

export default function PeminjamanPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowInfo, setBorrowInfo] = useState({
    nim: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    const t = setTimeout(() => {
      fetch(`/api/tools?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then(setResults)
        .catch(console.error);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  function addToCart(id: number) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  async function submitBorrow() {
    for (const [id, qty] of Object.entries(cart)) {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: Number(id),
          qty,
          nim: borrowInfo.nim,
          borrower: borrowInfo.name,
          phone: borrowInfo.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Gagal: " + JSON.stringify(data));
        return;
      }
    }
    setCart({});
    setModalOpen(false);
    setBorrowInfo({ nim: "", name: "", phone: "" });
    alert("Berhasil meminjam!");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Peminjaman Alat</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama alat..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Cari
        </button>
      </div>

      <div className="grid gap-3">
        {results.map((tool) => (
          <div
            key={tool.id}
            className="border rounded p-3 flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{tool.name}</div>
              <div className="text-sm">
                Qty: {tool.quantity} • Borrowed: {tool.borrowed}
              </div>
            </div>
            <div>
              <button
                onClick={() => addToCart(tool.id)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Pinjam ({Object.values(cart).reduce((a, b) => a + b, 0)})
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-2">Form Peminjaman</h3>
            <input
              placeholder="NIM"
              value={borrowInfo.nim}
              onChange={(e) =>
                setBorrowInfo({ ...borrowInfo, nim: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              placeholder="Nama lengkap"
              value={borrowInfo.name}
              onChange={(e) =>
                setBorrowInfo({ ...borrowInfo, name: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              placeholder="No HP"
              value={borrowInfo.phone}
              onChange={(e) =>
                setBorrowInfo({ ...borrowInfo, phone: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Batal
              </button>
              <button
                onClick={submitBorrow}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
