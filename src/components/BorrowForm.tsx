"use client";

import { useState } from "react";
import { BorrowFormData } from "@/app/types";

interface BorrowFormProps {
  quantity: number;
  itemName: string;
  onSubmit: (formData: BorrowFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function BorrowForm({
  quantity,
  itemName,
  onSubmit,
  onCancel,
  isSubmitting,
}: BorrowFormProps) {
  const [formData, setFormData] = useState<BorrowFormData>({
    nim: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    nim: "",
    name: "",
    phone: "",
  });

  const validateForm = (): boolean => {
    const newErrors = {
      nim: "",
      name: "",
      phone: "",
    };

    let isValid = true;

    if (!formData.nim.trim()) {
      newErrors.nim = "NIM wajib diisi";
      isValid = false;
    } else if (!/^\d+$/.test(formData.nim)) {
      newErrors.nim = "NIM harus berupa angka";
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
      isValid = false;
    } else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Nomor telepon tidak valid (10-13 digit)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleInputChange = (field: keyof BorrowFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-700">
          Anda akan meminjam:{" "}
          <span className="font-semibold">
            {quantity}x {itemName}
          </span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          NIM <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.nim}
          onChange={(e) => handleInputChange("nim", e.target.value)}
          className={`input-field ${errors.nim ? "border-red-500" : ""}`}
          placeholder="Contoh: 21120121130001"
          disabled={isSubmitting}
        />
        {errors.nim && (
          <p className="text-red-500 text-sm mt-1">{errors.nim}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`input-field ${errors.name ? "border-red-500" : ""}`}
          placeholder="Contoh: Ahmad Budiman"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Nomor Telepon <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`input-field ${errors.phone ? "border-red-500" : ""}`}
          placeholder="Contoh: 081234567890"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 btn-secondary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Memproses..." : "Konfirmasi Peminjaman"}
        </button>
      </div>
    </div>
  );
}
