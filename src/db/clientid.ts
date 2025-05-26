export const getClientId = () => {
    const clientIdFromStorage = localStorage.getItem("clientId");
    if (clientIdFromStorage) {
        return clientIdFromStorage;
    }
    const newClientId = crypto.randomUUID();
    localStorage.setItem("clientId", newClientId);
    return newClientId;
};
