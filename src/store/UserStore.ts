import { create } from 'zustand'

interface UserState {
    email: string
    authorized: boolean
    authorize: (userState: boolean) => void
}

const useBearStore = create<UserState>()((set) => ({
    email: "",
    authorized: false,
    authorize: (userState) => set(() => ({ authorized: userState })),
}))

export default useBearStore;