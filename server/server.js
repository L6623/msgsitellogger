import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let messages = [];

// Obtener mensajes
app.get("/messages", (req, res) => {
    res.json(messages);
});

// Enviar mensaje
app.post("/messages", (req, res) => {
    console.log("Mensaje recibido:", req.body); // <-- IMPORTANTE
    const msg = req.body;
    messages.push(msg);
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log("Servidor HTTP corriendo en puerto " + port);
});
