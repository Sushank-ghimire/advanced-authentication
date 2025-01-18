import { create } from "zustand";

interface UserStoreTypes {
  isLoading: boolean;
  loginUser: () => Promise<void>;
  signupUser: () => Promise<void>;
  error: string | null;
}

const useUserStore = create<UserStoreTypes>((set, get) => ({
  isLoading: false,
  error: null,
  signupUser: async () => {},
  loginUser: async () => {},
}));

export default useUserStore;
