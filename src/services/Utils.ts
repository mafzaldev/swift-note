
const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password));
};

const setLocalStorage = (key: string, value: any) => {
    return window.localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (key: string) => {
    return window.localStorage.getItem(key)!;
}

const removeLocalStorage = (key: string) => {
    return window.localStorage.removeItem(key);
}


export { validateEmail, validatePassword, setLocalStorage, getLocalStorage, removeLocalStorage }