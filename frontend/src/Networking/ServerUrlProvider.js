export const serverUrl = () => {
    // This env is set during the build process in the Dockerfile
    // There might be a better way, investigate :)
    const env = process.env.REACT_APP_BACKEND_URL;
    const server = env || "ws://" + window.location.hostname + ":8080/websocket";
    console.log("Connecting to api at:", server);
    return server;
};
