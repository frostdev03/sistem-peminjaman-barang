// // src/components/SearchBar.tsx

// import { Search } from "lucide-react";
// import React from "react";

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   onSearch: () => void;
// }

// export default function SearchBar({
//   value,
//   onChange,
//   onSearch,
// }: SearchBarProps) {
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       onSearch();
//     }
//   };

//   return (
//     <div className="mb-6 relative">
//       <input
//         type="text"
//         placeholder="Cari nama barang atau kategori..."
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className="input-field pl-10" // 'input-field' dari globals.css
//       />
//       <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//     </div>
//   );
// }

// src/components/SearchBar.tsx

"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="mb-6 flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari barang atau kategori..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>
      {onSearch && (
        <button onClick={onSearch} className="btn-primary">
          Cari
        </button>
      )}
    </div>
  );
};

export default SearchBar;
