export const getStoredItem = <T>(key: string): T | undefined => {
  let item = sessionStorage.getItem(key);
  if (item) return JSON.parse(item);
};

export const saveItem = (key: string, item: any) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};
