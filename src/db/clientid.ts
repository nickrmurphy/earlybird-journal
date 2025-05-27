const KEY = "clientId";

export const getClientId = () => {
    const clientIdFromStorage = localStorage.getItem(KEY);
    if (clientIdFromStorage) {
        return clientIdFromStorage;
    }
    const newClientId = crypto.randomUUID();
    localStorage.setItem(KEY, newClientId);
    return newClientId;
};
