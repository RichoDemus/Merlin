import {CONNECT_TO_SERVER, connected, connecting, disconnected, disconnecting, error, roomJoined} from "./Actions";
import {CREATE_ROOM, JOIN_ROOM} from "../JoinRoom/Actions";

const WebsocketMiddleware = (() => {
    let socket = null;

    const onOpen = (ws, store, action) => evt => {
        //Send a handshake, or authenticate with remote end

        //Tell the store we're connected
        store.dispatch(connected());
        socket.send(JSON.stringify(action));
    };

    const onClose = (ws, store) => evt => {
        //Tell the store we've disconnected
        store.dispatch(disconnected());
        store.dispatch(error());
    };

    const onMessage = (ws, store) => evt => {
        //Parse the JSON message received on the websocket
        console.log("Message received:", evt);
        const msg = JSON.parse(evt.data);

        switch (msg.type) {
            case "ROOM_JOINED":
                //Dispatch an action that adds the received message to our state
                store.dispatch(roomJoined(msg));
                break;
            case "DEBUG":
                console.log("DEBUG:", msg.msg);
                store.dispatch({type: "SEND_CHAT_MESSAGE", msg: "Hello from client"});
                // store.dispatch({type: "DISCONNECT"});
                break;
            default:
                console.log("Received unknown message type: '" + msg.type + "', dispating it anyway");
                store.dispatch(msg);
                break;
        }
    };

    return store => next => action => {
        const actionWithUsername = Object.assign({}, action, {name: store.getState().name});
        switch (action.type) {
            case CREATE_ROOM:
                if (socket === null) {
                    store.dispatch(connecting());

                    socket = new WebSocket("ws://" + window.location.hostname + ":8080/websocket");
                    socket.onmessage = onMessage(socket, store);
                    socket.onclose = onClose(socket, store);
                    socket.onopen = onOpen(socket, store, actionWithUsername);
                } else {
                    socket.send(JSON.stringify(actionWithUsername));
                }

                break;

            case JOIN_ROOM:
                if (socket === null) {
                    store.dispatch(connecting());

                    socket = new WebSocket("ws://" + window.location.hostname + ":8080/websocket");
                    socket.onmessage = onMessage(socket, store);
                    socket.onclose = onClose(socket, store);
                    socket.onopen = onOpen(socket, store, actionWithUsername);
                } else {
                    socket.send(JSON.stringify(actionWithUsername));
                }

                break;

            //The user wants us to connect
            case CONNECT_TO_SERVER:
                //Start a new connection to the server
                if (socket !== null) {
                    socket.close();
                }
                //Send an action that shows a "connecting..." status for now
                store.dispatch(connecting());

                //Attempt to connect (we could send a 'failed' action on error)
                socket = new WebSocket("ws://localhost:8080/websocket");
                socket.onmessage = onMessage(socket, store);
                socket.onclose = onClose(socket, store);
                socket.onopen = onOpen(socket, store, action.token);

                break;

            //The user wants us to disconnect
            case 'DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;

                //Set our state to disconnected
                store.dispatch(disconnecting());
                break;

            //Send the 'SEND_MESSAGE' action down the websocket to the server
            case 'SEND_CHAT_MESSAGE':
                socket.send(JSON.stringify(action));
                break;

            //This action is irrelevant to us, pass it on to the next middleware
            default:
                return next(action);
        }
    }
})();

export default WebsocketMiddleware