async function save_note(filename, content) {
    // ... (dein bestehender Code zum Speichern bleibt gleich)
    // (Stelle sicher, dass die Funktion weiterhin "save_note" heißt)
}

async function read_note(filename) {
    try {
        // Öffnet den Datei-Picker, damit du die Datei auswählen kannst
        const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'Textdatei', accept: { 'text/plain': ['.txt'] } }],
            multiple: false
        });
        const file = await handle.getFile();
        const content = await file.text();
        
        return JSON.stringify({
            status: "success",
            content: content
        });
    } catch (err) {
        return JSON.stringify({
            status: "error",
            message: `Konnte Datei nicht lesen: ${err.message}`
        });
    }
}

// Beide Funktionen für den Agenten registrieren
window.agentTools = {
    save_note: save_note,
    read_note: read_note
};