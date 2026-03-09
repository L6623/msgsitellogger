import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let messages = [];

// Obtener mensajes
app.get("/messages", (req, res) => {
    res.json(messages);
});

// Enviar mensaje
app.post("/messages", (req, res) => {
    const msg = req.body;
    messages.push(msg);
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log("Servidor HTTP corriendo en puerto " + port);
});
