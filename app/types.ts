// src/types.ts atau src/types/index.ts

export interface Item {
  id: number;
  name: string;
  category: string;
  stock: number;
  image: string;
  description: string;
  borrowed: number;
}

export interface BorrowRecord {
  id: number;
  nim: string;
  name: string;
  phone: string;
  item: string;
  qty: number;
  borrowDate: string;
  returnDate: string;
}

export interface BorrowFormData {
  nim: string;
  name: string;
  phone: string;
}

export interface ItemFormData {
  name: string;
  category: string;
  stock: string;
  description: string;
  image: string;
}
