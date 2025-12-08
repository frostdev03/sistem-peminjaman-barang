// "use client";

// import { Search } from "lucide-react";

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   onSearch?: () => void;
// }

// const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && onSearch) onSearch();
//   };

//   const hasText = value.length > 0; // <<=== cek apakah user sudah mengetik

//   return (
//     <div className="w-full flex justify-center mb-8">
//       <div className="relative w-[480px]">
//         {/* Pastel background */}
//         <div className="absolute inset-0 bg-blue-100 rounded-full opacity-80 pointer-events-none" />

//         {/* Search icon → hilang ketika ada teks */}
//         {!hasText && (
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10 transition-opacity" />
//         )}

//         <input
//           type="text"
//           placeholder={hasText ? "" : "Cari barang atau kategori..."} // placeholder hilang
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="
//             w-full
//             h-12
//             rounded-full
//             pl-12 pr-5
//             bg-transparent
//             relative z-20
//             placeholder-gray-500
//             text-gray-800
//             text-center
//             placeholder:text-center
//             focus:outline-none
//             transition-all
//           "
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

"use client";

import type React from "react";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) onSearch();
  };

  return (
    <div className="w-full flex justify-center mb-8">
      <div className="relative w-full max-w-md">
        {/* Wrapper with gradient border effect */}
        <div
          className={`relative rounded-xl transition-all duration-300 ${
            isFocused
              ? "ring-2 ring-blue-500 ring-offset-2"
              : "ring-1 ring-gray-200"
          }`}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            placeholder="Cari barang atau kategori..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="
              w-full
              h-12
              pl-12
              pr-4
              bg-white
              text-gray-900
              placeholder-gray-500
              rounded-xl
              focus:outline-none
              transition-all
            "
          />

          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
