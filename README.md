# Setup Instructions - Sistem Peminjaman Barang

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Database (PostgreSQL/MySQL/SQLite)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 2. Setup Database

Copy `.env.example` ke `.env` dan sesuaikan `DATABASE_URL`:

```bash
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/peminjaman_barang"
```

### 3. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. (Optional) Seed Database

Buat file `prisma/seed.ts` untuk data dummy:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Buat beberapa items dummy
  await prisma.item.createMany({
    data: [
      {
        name: "Proyektor",
        description: "Proyektor untuk presentasi",
        stock: 5,
        image:
          "https://images.unsplash.com/photo-1573171586976-dfb18e88469d?w=500",
      },
      {
        name: "Laptop",
        description: "Laptop untuk development",
        stock: 10,
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      },
      {
        name: "Kamera DSLR",
        description: "Kamera untuk dokumentasi",
        stock: 3,
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Tambahkan di `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Run seed:

```bash
npx prisma db seed
```

### 6. Run Development Server

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Konfigurasi Password Admin

Edit file `app/manajemen/page.tsx` baris 17:

```typescript
const ADMIN_PASSWORD = "admin123"; // Ganti dengan password yang kamu inginkan
```

## Fitur Utama

### 1. Peminjaman (/)

- Search bar untuk mencari barang
- Grid card menampilkan semua barang
- Modal detail dengan form peminjaman
- Quantity selector (+ dan -)

### 2. Manajemen Barang (/manajemen)

- Password protection
- CRUD (Create, Read, Update, Delete) barang
- Upload image via URL

### 3. Riwayat (/riwayat)

- Tabel riwayat semua peminjaman
- Status: Sudah Kembali / Belum Kembali
- Tombol "Tandai Kembali"

## Database Schema

### Item

- id (String, Primary Key)
- name (String)
- description (String, nullable)
- image (String, nullable)
- stock (Int)
- createdAt (DateTime)
- updatedAt (DateTime)

### Borrowing

- id (String, Primary Key)
- nim (String)
- name (String)
- phone (String)
- itemId (String, Foreign Key)
- quantity (Int)
- borrowDate (DateTime)
- returnDate (DateTime, nullable)
- isReturned (Boolean)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database ORM**: Prisma
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Troubleshooting

### Error: Prisma Client not generated

```bash
npx prisma generate
```

### Error: Cannot connect to database

Pastikan database sudah running dan `DATABASE_URL` di `.env` sudah benar.

### Error: Module not found

```bash
npm install
```

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

## Customization

### Ganti Warna

Edit `app/globals.css`:

```css
:root {
  --primary-blue: #2563eb;
  --primary-blue-dark: #1e40af;
  --primary-blue-light: #3b82f6;
}
```

### Ganti Logo/Title

Edit `src/components/Navigation.tsx` dan `app/layout.tsx`
