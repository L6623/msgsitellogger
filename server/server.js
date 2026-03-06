const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Archivo donde se guardarán los mensajes
const DATA_FILE = path.join(__dirname, "messages.json");

// Cargar mensajes desde archivo
let messages = [];
if (fs.existsSync(DATA_FILE)) {
    try {
        messages = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (err) {
        console.error("Error leyendo messages.json:", err);
        messages = [];
    }
}

// Guardar mensajes en archivo
function saveMessages() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

// CORS para permitir acceso desde Neocities
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Obtener mensajes
app.get("/messages", (req, res) => {
    res.json(messages);
});

// Enviar mensaje
app.post("/messages", (req, res) => {
    try {
        const msg = req.body;

        if (!msg.user || !msg.message || !msg.time) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        messages.push(msg);
        saveMessages();

        res.json({ status: "ok" });
    } catch (err) {
        console.error("Error al guardar mensaje:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});
