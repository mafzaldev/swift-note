import { create } from 'zustand'

interface UserState {
    isAuthenticated: boolean
    email: string
    uid: string
    setCredentials: (isAuthenticated: boolean, email: string, uid: string) => void
}

const useUserStore = create<UserState>()((set) => ({
    email: "",
    uid: "",
    isAuthenticated: false,
    setCredentials: (isAuthorized: boolean, email: string, uid: string) => {
        set({
            isAuthenticated: isAuthorized,
            email: email,
            uid: uid
        });
    }
}))

export default useUserStore;