export interface User {
  id: number;
  name: string;
  password?: string;
  email?: string;
  phone?: string;
  gender: "male" | "female";
  birthday?: string;
  role: "user" | "admin";
  is_active: boolean;
  created_at: string;
}
