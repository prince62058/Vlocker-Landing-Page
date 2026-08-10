export const getStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined" && typeof window.localStorage?.getItem === "function") {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const setStorageItem = (key: string, value: string): void => {
  if (typeof window !== "undefined" && typeof window.localStorage?.setItem === "function") {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }
};

export const removeStorageItem = (key: string): void => {
  if (typeof window !== "undefined" && typeof window.localStorage?.removeItem === "function") {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
};
