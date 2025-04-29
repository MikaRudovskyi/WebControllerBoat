// Importa le librerie necessarie
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

// Crea un'app Express
const app = express();
// Crea un server HTTP
const server = http.createServer(app);
// Crea un server WebSocket
const wss = new WebSocket.Server({ server });

// Imposta la cartella 'public' per i file statici
app.use(express.static(path.join(__dirname, 'public')));

// Gestisce le connessioni WebSocket
wss.on('connection', ws => {
    console.log("Client connected"); // Log per la connessione del client
    // Gestisce i messaggi ricevuti dal client
    ws.on('message', message => {
        console.log(`Received: ${message}`); // Log del messaggio ricevuto
        ws.send(`Echo: ${message}`); // Risponde con lo stesso messaggio
    });
});

// Avvia il server sulla porta 8080
server.listen(8081, '172.20.10.10', () => {
    console.log("Server running on http://172.20.10.10:8081");
});

