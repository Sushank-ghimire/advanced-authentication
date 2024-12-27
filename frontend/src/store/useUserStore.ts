import { create } from "zustand";

interface UserStoreTypes {
  isLoading: boolean | null;
  loginUser: () => Promise<void>;
  signupUser: () => Promise<void>;
}

const useUserStore = create<UserStoreTypes>((set, get) => ({
  isLoading: null,
  signupUser: async () => {},
  loginUser: async () => {},
}));

export default useUserStore;
