# 📦 Sistem Peminjaman Barang

Aplikasi web modern untuk mengelola sistem peminjaman barang/komponen elektronik dengan antarmuka yang user-friendly dan fitur lengkap.

---

## 🎯 Fitur Utama

- **📊 Dashboard Peminjaman** - Tampilkan dan kelola semua barang yang sedang dipinjam
- **🛠️ Manajemen Barang** - Tambah, edit, dan hapus item barang dengan kategori yang terorganisir
- **📋 Riwayat Peminjaman** - Tracking lengkap status pengembalian barang dengan timestamp otomatis
- **🔐 Proteksi Password** - Akses terbatas ke halaman manajemen dan riwayat
- **📱 Responsive Design** - Desain modern yang optimal di semua perangkat (desktop, tablet, mobile)
- **⚡ Real-time Updates** - Stok barang otomatis ter-update saat peminjaman dan pengembalian

---

## 🛠️ Tech Stack

| Layer                | Teknologi                              |
| -------------------- | -------------------------------------- |
| **Frontend**         | React 19.2, Next.js 16, TypeScript     |
| **Styling**          | Tailwind CSS 4.1, Shadcn/UI Components |
| **Backend**          | Next.js API Routes, Server Actions     |
| **Database**         | SQLite + Prisma ORM                    |
| **Icons**            | Lucide React                           |
| **Session**          | Iron Session                           |
| **State Management** | React Hooks                            |

---

## 📋 Requirements

### Prasyarat Sistem

- **Node.js** >= 18.0.0
- **npm** atau **pnpm** (package manager)
- **Git** untuk version control
- Storage disk minimal 100MB

### Browser yang Didukung

- Chrome/Chromium >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

---

## 🚀 Panduan Instalasi & Setup

### 1️⃣ Clone Repository

\`\`\`bash
git clone <repository-url>
cd sistem-peminjaman-barang
\`\`\`

### 2️⃣ Install Dependencies

\`\`\`bash
npm install

# atau jika menggunakan pnpm

pnpm install
\`\`\`

### 3️⃣ Setup Environment Variables

Buat file `.env.local` di root directory:

\`\`\`env

# Database

DATABASE_URL="file:./dev.db"

# Session Secret (generate dengan openssl rand -hex 32)

IRON_SESSION_PASSWORD="your-32-character-hex-string"
\`\`\`

### 4️⃣ Setup Database

Jalankan Prisma migration untuk membuat database:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

Jika ingin seed database dengan data contoh:
\`\`\`bash
npx prisma db seed
\`\`\`

### 5️⃣ Jalankan Development Server

\`\`\`bash
npm run dev

# atau

pnpm dev
\`\`\`

Aplikasi akan tersedia di: **http://localhost:3000**

### 6️⃣ Build untuk Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📁 Struktur Project

\`\`\`
sistem-peminjaman-barang/
├── app/ # Next.js App Router
│ ├── page.tsx # Halaman Home
│ ├── peminjaman/ # Halaman Peminjaman
│ ├── manajemen/ # Halaman Manajemen Barang
│ ├── riwayat/ # Halaman Riwayat Peminjaman
│ ├── api/ # API Routes
│ └── layout.tsx # Root Layout
├── src/
│ ├── actions/ # Server Actions (toolActions.ts)
│ └── components/ # Reusable Components
│ ├── Navbar.tsx # Navigation Bar
│ ├── Toast.tsx # Notification System
│ ├── SearchBar.tsx # Search Component
│ └── ...
├── components/ui/ # Shadcn/UI Components Library
├── prisma/
│ ├── schema.prisma # Database Schema
│ └── dev.db # SQLite Database
├── public/ # Static Assets
├── lib/ # Utility Functions
├── hooks/ # Custom React Hooks
└── styles/ # Global Styles

\`\`\`

---

## 🔑 Credentials & Keamanan

### Password Proteksi

- **Username**: Admin
- **Password**: `teknisidtee`

> ⚠️ **Penting**: Ubah password default di production environment!

### Session Management

- Menggunakan `iron-session` untuk secure session storage
- Session cookies tersimpan secara HTTP-only
- Auto-logout setelah inactivity tertentu

---

## 📊 Database Schema

### Model: Tool (Barang)

\`\`\`prisma
model Tool {
id Int @id @default(autoincrement())
name String // Nama barang
category String // Kategori (Mikrokontroler, Kabel, dll)
description String // Deskripsi barang
quantity Int // Stok total
borrowed Int // Jumlah yang sedang dipinjam
imageUrl String? // URL gambar barang
createdAt DateTime @default(now())
}
\`\`\`

### Model: History (Riwayat Peminjaman)

\`\`\`prisma
model History {
id Int @id @default(autoincrement())
toolId Int // Reference ke Tool
toolName String // Nama barang (snapshot)
qty Int // Jumlah yang dipinjam
nim String // NIM Peminjam
borrower String // Nama Peminjam
phone String? // No. Telepon Peminjam
isReturned Boolean // Status pengembalian
returnedAt DateTime? // Tanggal pengembalian (auto-set)
createdAt DateTime @default(now())
}
\`\`\`

---

## 🎨 Kategori Barang yang Tersedia

- 🔌 **Mikrokontroler** - Arduino, STM32, Raspberry Pi
- 🔗 **Kabel** - USB, HDMI, Jumper wires
- 📍 **Resistor** - Berbagai ohm values
- ⚡ **Kapasitor** - Electrolytic, Ceramic
- 📡 **Sensor** - DHT, Ultrasonic, Flame
- 🎛️ **Aktuator** - Motor, Servo, Relay
- 📦 **Lain-lain** - Komponen lainnya

---

## 🎯 Panduan Penggunaan

### Halaman Peminjaman

1. Cari barang menggunakan search bar
2. Klik tombol peminjaman pada barang
3. Isi form peminjaman (NIM, Nama, No. Telp)
4. Submit untuk mencatat peminjaman
5. Toast notifikasi akan muncul saat berhasil

### Halaman Manajemen (Proteksi Password)

1. Klik "Manajemen" di navbar
2. Masukkan password: `teknisidtee`
3. Kelola barang: Tambah, Edit, Hapus
4. Kategori dapat dipilih dari dropdown list

### Halaman Riwayat (Proteksi Password)

1. Klik "Riwayat" di navbar
2. Masukkan password: `teknisidtee`
3. Lihat semua history peminjaman
4. Klik tombol "Edit" untuk modify data
5. Klik tombol "Dikembalikan" untuk mark barang sebagai dikembalikan
6. Tanggal pengembalian otomatis terisi dengan timestamp saat diklik

---

## 🐛 Troubleshooting

### Database Error

\`\`\`
PrismaClientInitializationError
\`\`\`
**Solusi**: Jalankan `npx prisma migrate dev` untuk sync schema dengan database

### Port 3000 Sudah Terpakai

\`\`\`bash

# Gunakan port berbeda

npm run dev -- -p 3001
\`\`\`

### Password Tidak Bekerja

- Pastikan password yang dimasukkan: `teknisidtee`
- Clear browser cookies dan coba lagi
- Restart development server

---

## 📝 Environment Variables Reference

\`\`\`env

# Wajib

DATABASE_URL=file:./dev.db
IRON_SESSION_PASSWORD=your-32-hex-string

# Optional

NODE_ENV=development
\`\`\`

---

## 🔄 Development Workflow

\`\`\`bash

# Start dev server

npm run dev

# Build untuk production

npm run build

# Check TypeScript errors

npx tsc --noEmit

# Database management

npx prisma studio # Visual database editor
npx prisma migrate dev # Create & apply migration
npx prisma db push # Push schema ke database
\`\`\`

---

## 📦 Deployment

### Deploy ke Vercel (Recommended)

\`\`\`bash

# Connect GitHub repository ke Vercel

# Set environment variables di Vercel dashboard

# Auto-deploy on push ke main branch

\`\`\`

### Deploy Lokal

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📄 Lisensi

Proyek ini adalah internal project untuk [Institut/Organisasi].

---

## 👥 Kontribusi

Untuk kontribusi atau report bugs, silakan buat issue di repository.

---

## 📞 Support

Jika mengalami masalah atau pertanyaan:

1. Baca dokumentasi di README ini
2. Check troubleshooting section
3. Hubungi admin sistem

---

**Last Updated**: Desember 2024  
**Version**: 1.0.0
