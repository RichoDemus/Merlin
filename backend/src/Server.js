import Koa from "koa";
import route from "koa-route";
import websockify from "koa-websocket";
import Rooms from "./Rooms.js";
import Player from "./Player";

const createServer = () => {
    const app = websockify(new Koa());
    const rooms = new Rooms();

// Regular middleware
// Note it's app.ws.use and not app.use
    app.ws.use((ctx, next) => {
        // return `next` to pass the context (ctx) on to the next ws middleware
        return next(ctx);
    });

// Using routes
    app.ws.use(route.all('/websocket', ctx => {
        // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
        // the websocket is added to the context on `ctx.websocket`.
        console.log("Client connected...");
        ctx.websocket.send(JSON.stringify({type: "DEBUG", msg: "Welcome"}));
        ctx.websocket.on('message', message => {
            console.log("Received:", message);
            const action = JSON.parse(message);
            switch (action.type) {
                case "CREATE_ROOM": {
                    console.log("User", action.name, "creating new room");
                    const player = new Player(action.name, ctx.websocket);
                    const room = rooms.createRoom(player);
                    ctx.websocket.on('close', room.leave(player)); //todo kill room or do host re-negotiation
                    console.log("Created room:", JSON.stringify(room), "There are now", rooms.size, "rooms");
                    player.sendMessage({
                        type: "ROOM_JOINED",
                        host: true,
                        number: room.roomNumber,
                        users: room.players
                    });
                    break;
                }
                case "JOIN_ROOM": {
                    console.log("User", action.name, "joining room", action.roomNumber);
                    const room = rooms.getRoom(action.roomNumber);
                    if (!room) {
                        console.log("Room not found:", action.roomNumber);
                        ctx.websocket.send(JSON.stringify({
                            type: "ROOM_NOT_FOUND"
                        }));
                        break;
                    }

                    const player = new Player(action.name);
                    room.join(player);
                    ctx.websocket.on('close', room.leave(player));
                    console.log("User", action.name, "joined room", JSON.stringify(room));
                    ctx.websocket.send(JSON.stringify({
                        type: "ROOM_JOINED",
                        host: false,
                        number: room.roomNumber,
                        users: room.players
                    }));
                    break;
                }
                default:
                //todo respond with error message
            }
        });
        ctx.websocket.on('close', message => {
            console.log("Socket closed...")
        });
    }));

    const server = {};
    server.start = () => {
        app.listen(8080, () => {
            console.log('Server listening at port %d', 8080);
        });
    };
    return server;
};

export default createServer;
