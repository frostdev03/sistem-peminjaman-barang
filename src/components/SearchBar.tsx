// "use client";

// import { Search } from "lucide-react";

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   onSearch?: () => void;
// }

// const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && onSearch) {
//       onSearch();
//     }
//   };

//   return (
//     <div className="mb-6 flex gap-2">
//       <div className="flex-1 relative">
//         <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Cari barang atau kategori..."
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//         />
//       </div>
//       {onSearch && (
//         <button onClick={onSearch} className="btn-primary">
//           Cari
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

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

//   return (
//     <div className="w-full flex justify-center mb-8">
//       <div className="relative w-[480px]">
//         {" "}
//         {/* <<=== LEBAR DI SINI */}
//         <div className="absolute inset-0 bg-blue-100 rounded-full opacity-80 pointer-events-none" />
//         <Search className="absolute left-34 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
//         <input
//           type="text"
//           placeholder="        Cari barang atau kategori..."
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="
//             text-center
//             w-full
//             h-12
//             rounded-full
//             pl-12 pr-5
//             bg-transparent
//             relative z-20
//             placeholder-gray-500
//             text-gray-800
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

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) onSearch();
  };

  const hasText = value.length > 0; // <<=== cek apakah user sudah mengetik

  return (
    <div className="w-full flex justify-center mb-8">
      <div className="relative w-[480px]">
        {/* Pastel background */}
        <div className="absolute inset-0 bg-blue-100 rounded-full opacity-80 pointer-events-none" />

        {/* Search icon → hilang ketika ada teks */}
        {!hasText && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 z-10 transition-opacity" />
        )}

        <input
          type="text"
          placeholder={hasText ? "" : "Cari barang atau kategori..."} // placeholder hilang
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="
            w-full
            h-12
            rounded-full
            pl-12 pr-5
            bg-transparent
            relative z-20
            placeholder-gray-500
            text-gray-800
            text-center
            placeholder:text-center
            focus:outline-none
            transition-all
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;
