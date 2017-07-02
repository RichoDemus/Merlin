import Koa from "koa";
import route from "koa-route";
import websockify from "koa-websocket";

const app = websockify(new Koa());

// Regular middleware
// Note it's app.ws.use and not app.use
app.ws.use((ctx, next) =>{
    // return `next` to pass the context (ctx) on to the next ws middleware
    return next(ctx);
});

// Using routes
app.ws.use(route.all('/websocket', ctx =>{
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    console.log("ping");
    ctx.websocket.send(JSON.stringify({type:"DEBUG", msg:"Welcome"}));
    ctx.websocket.on('message', message =>{
        // do something with the message from client
        console.log(message);
    });
}));

app.listen(8080, () =>{
    console.log('Server listening at port %d', 8080);
});
