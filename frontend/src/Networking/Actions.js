export const CONNECT_TO_SERVER = "CONNECT_TO_SERVER";
export const CONNECTING_TO_SERVER = "CONNECTING_TO_SERVER";
export const CONNECTED_TO_SERVER = "CONNECTED_TO_SERVER";
export const DISCONNECTED_FROM_SERVER = "DISCONNECTED_FROM_SERVER";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";

export const connect = () => {
    return {
        type: CONNECT_TO_SERVER
    }
};

export const connecting = () => {
    return {
        type: CONNECTING_TO_SERVER
    }
};

export const connected = () => {
    return {
        type: CONNECTED_TO_SERVER
    }
};

export const disconnected = () => {
    return {
        type: DISCONNECTED_FROM_SERVER
    }
};

export const messageReceived = (message) => {
    return {
        type: MESSAGE_RECEIVED,
        message
    }
};
