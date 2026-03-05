const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

console.log("Servidor WebSocket corriendo en ws://localhost:3000");

wss.on("connection", (ws) => {
    console.log("Nuevo usuario conectado");

    ws.on("message", (data) => {
        const msg = data.toString();
        console.log("Mensaje recibido:", msg);

        // Reenviar a todos los clientes
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });

    ws.on("close", () => {
        console.log("Usuario desconectado");
    });
});
