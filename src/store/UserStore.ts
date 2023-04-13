import { create } from 'zustand'

interface UserState {
    isAuthorized: boolean
    email: string
    uid: string
    setCredentials: (isAuthorized: boolean, email: string, uid: string) => void
}

const userStore = create<UserState>()((set) => ({
    email: "",
    uid: "",
    isAuthorized: false,
    setCredentials: (isAuthorized: boolean, email: string, uid: string) => {
        set({
            isAuthorized: isAuthorized,
            email: email,
            uid: uid
        });
    }
}))

export default userStore;