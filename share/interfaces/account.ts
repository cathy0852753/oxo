export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  icon?: string;
}

export interface Transaction {
  id: number;
  userId: number;
  date: string;
  categoryId: number;
  amount: number;
  type: "income" | "expense";
  note?: string;
}
