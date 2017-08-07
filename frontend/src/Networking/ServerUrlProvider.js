export const serverUrl = () => {
    // This doesn't work...
    const env = process.env.REACT_APP_API_URL;
    const server = env || "ws://" + window.location.hostname + ":8080/websocket";
    console.log("Connecting to api at:", server);
    return server;
};
