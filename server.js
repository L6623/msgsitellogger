import { WebSocketServer } from "ws";

const port = process.env.PORT || 3000;

const wss = new WebSocketServer({ port });

console.log("WebSocket server running on port", port);

wss.on("connection", (ws) => {
    console.log("Nuevo usuario conectado");

    ws.on("message", (data) => {
        console.log("Mensaje recibido:", data.toString());

        // Reenviar a todos
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(data.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Usuario desconectado");
    });
});
