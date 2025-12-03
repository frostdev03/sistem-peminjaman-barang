// // src/components/ImageUpload.tsx

// import { Image as ImageIcon, X } from "lucide-react";
// import React from "react";

// interface ImageUploadProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function ImageUpload({ value, onChange }: ImageUploadProps) {
//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-semibold mb-2">
//         URL Gambar Barang
//       </label>
//       <div className="relative">
//         <input
//           type="url"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="input-field pr-10"
//           placeholder="https://images.unsplash.com/..."
//         />
//         {value && (
//           <button
//             onClick={() => onChange("")}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
//             title="Hapus URL Gambar"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         )}
//       </div>

//       {value ? (
//         <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-300 flex items-center justify-center">
//           {/* Menggunakan elemen <img> biasa untuk menghindari masalah import 'next/image' yang tidak perlu */}
//           <img
//             src={value}
//             alt="Preview"
//             className="object-contain max-h-full max-w-full"
//           />
//         </div>
//       ) : (
//         <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500">
//           <ImageIcon className="w-8 h-8 mb-1" />
//           <p className="text-sm">Masukkan URL Gambar Barang</p>
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/ImageUpload.tsx

"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        alert("Ukuran file terlalu besar! Maksimal 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Gambar Barang</label>

      {value ? (
        <div className="relative">
          <div className="w-full h-48 relative rounded-lg border-2 border-gray-300 overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
          <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-semibold">
              Klik untuk upload gambar
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Format: JPG, PNG, GIF (Max: 5MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
