# Pinjam Lab

Aplikasi web untuk mengelola peminjaman alat dan bahan laboratorium secara mudah, cepat, dan efisien.

---

## Fitur Utama

- Manajemen alat: tambah, edit, dan hapus data alat
- Sistem peminjaman dengan data peminjam yang lengkap
- Riwayat peminjaman dan pengembalian secara real-time
- Manajemen stok otomatis
- Halaman manajemen dan riwayat dilindungi password
- Antarmuka modern berbasis Tailwind CSS

---

## Tech Stack

### Frontend
- Next.js 16  
- React 19.2  
- Tailwind CSS 4  
- Lucide Icons  

### Backend & Database
- Node.js  
- Prisma ORM  
- SQLite  

### Development Tools
- TypeScript  
- ESLint  
- PostCSS  

---

## Requirements

- Node.js versi 18 atau lebih tinggi  
- npm atau yarn  
- Git

---

## Instalasi & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd sistem-peminjaman-barang
````

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables

Buat file `.env.local`:

```bash
DATABASE_URL="file:./dev.db"
```

### 4. Setup Database

```bash
npx prisma migrate dev --name init
```

### 5. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
```

Aplikasi dapat diakses pada:
`http://localhost:3000`

---

## Panduan Penggunaan

### Navigasi Utama

* Beranda
* Peminjaman
* Manajemen (memerlukan password)
* Riwayat (memerlukan password)

---

### Tambah Alat Baru (Manajemen)

1. Buka halaman Manajemen, masukkan password: `teknisidtee`
2. Klik "Tambah Alat"
3. Isi:

   * Nama alat
   * Kategori
   * Deskripsi
   * Stok
4. Klik "Simpan"

### Pinjam Alat (Peminjaman)

1. Buka halaman Peminjaman
2. Pilih alat dari daftar
3. Isi:

   * NIM
   * Nama
   * Nomor telepon
   * Jumlah yang dipinjam
4. Klik "Pinjam"

### Kembalikan Alat (Riwayat)

1. Buka halaman Riwayat, masukkan password: `teknisidtee`
2. Cari peminjaman yang ingin dikembalikan
3. Klik "Dikembalikan"

Sistem akan:

* Mengembalikan stok
* Mencatat tanggal kembali
* Mengubah status menjadi "Dikembalikan"

### Edit Data Alat

1. Buka halaman Manajemen
2. Klik "Edit"
3. Atur data yang diperlukan
4. Klik "Simpan"

### Edit Data Peminjaman

1. Buka halaman Riwayat
2. Klik "Edit"
3. Ubah data peminjaman
4. Klik "Simpan"

---

## Keamanan

Password halaman Manajemen dan Riwayat:

```
teknisidtee
```

---

## Database Schema

### Model Tool

```
id          - Identifier
name        - Nama alat
category    - Kategori alat
description - Deskripsi
quantity    - Stok total
borrowed    - Jumlah dipinjam
imageUrl    - Gambar (opsional)
createdAt   - Waktu pembuatan
```

### Model History

```
id          - Identifier
toolId      - Reference ke Tool
toolName    - Nama alat
qty         - Jumlah dipinjam
nim         - NIM peminjam
borrower    - Nama peminjam
phone       - Nomor telepon
isReturned  - Status
returnedAt  - Tanggal kembali
createdAt   - Tanggal pinjam
```

---

## Struktur Project

```
sistem-peminjaman-barang/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── manajemen/
│   ├── peminjaman/
│   ├── riwayat/
│   ├── globals.css
│   └── types.ts
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ItemCard.tsx
│   │   └── Toast.tsx
│   └── actions/
│       └── toolActions.ts
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── components/ui/
├── public/
└── package.json
```

---

## Troubleshooting

### Database Error

```bash
npx prisma migrate reset
# atau
rm prisma/dev.db
npx prisma migrate dev --name init
```

### Port 3000 Sudah Digunakan

```bash
npm run dev -- -p 3001
```

### Module Not Found

```bash
rm -rf node_modules .next
npm install
npm run dev
```

---

## Build & Deploy

### Build Production

```bash
npm run build
npm start
```

---

## License

Proprietary — Hak Cipta Teknisi IT

---

## Support

Untuk masalah atau pertanyaan, hubungi administrator sistem.


Cheers
