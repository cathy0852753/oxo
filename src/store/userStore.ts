import { create } from "zustand";
import { User } from "@share/interfaces/user";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  editUser: (userId: number, user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) =>
    set((state) => ({
      users: [user, ...state.users],
    })),
  editUser: (userId, newUser) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === userId ? newUser : user)),
    })),
}));

export default useUserStore;
