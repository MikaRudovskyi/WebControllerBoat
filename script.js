// Crea una connessione WebSocket al server in localhost sulla porta 8080
const socket = new WebSocket("ws://172.20.10.10:8081");
let speed = 0, direction = 0;

// Funzione per impostare il joystick
function setupJoystick(elementId, callback, lockX, lockY) {
    let joystick = nipplejs.create({
        zone: document.getElementById(elementId), // Zona in cui il joystick si trova
        mode: 'static', // Modalità statica del joystick
        position: { left: '50%', top: '50%' }, // Posiziona il joystick al centro
        lockX: lockX, // Se true, blocca il movimento orizzontale
        lockY: lockY // Se true, blocca il movimento verticale
    });

    joystick.on('move', (evt, data) => {
        let x = data.vector.x || 0; // Ottiene la componente x del movimento
        let y = data.vector.y || 0; // Ottiene la componente y del movimento
        callback(x, y); // Esegue il callback passando x e y
    });

    joystick.on('end', () => callback(0, 0)); // Resetta i valori quando il movimento termina
}

// Imposta il joystick 1 per modificare la velocità
setupJoystick("joystick1", (_, y) => {
    speed = -y; // Imposta la velocità in base al movimento verticale del joystick
    document.getElementById("velocity").textContent = speed.toFixed(2); // Visualizza la velocità
    sendData(); // Invia i dati al server
}, false, true);

// Imposta il joystick 2 per modificare la direzione
setupJoystick("joystick2", (x, _) => {
    direction = x; // Imposta la direzione in base al movimento orizzontale del joystick
    updateDirectionText(direction); // Aggiorna il testo della direzione
    sendData(); // Invia i dati al server
}, true, false);

// Funzione per aggiornare il testo della direzione
function updateDirectionText(directionValue) {
    let directionText = "";

    if (directionValue > 0.8) {
        directionText = "Destra"; // Destra
    } else if (directionValue > 0.3) {
        directionText = "Leggermente a destra";
    } else if (directionValue > -0.3) {
        directionText = "Centro"; // Centro
    } else if (directionValue > -0.8) {
        directionText = "Leggermente a sinistra";
    } else {
        directionText = "Sinistra"; // Sinistra
    }

    document.getElementById("direction").textContent = directionText; // Visualizza la direzione
}

// Funzione per inviare i dati al server tramite WebSocket
function sendData() {
    let data = { speed, direction }; // Crea un oggetto con velocità e direzione
    socket.send(JSON.stringify(data)); // Invia i dati al server come stringa JSON
}
