/**
 * NoteManager Logic
 */

// Tool zum Speichern
async function save_note(filename, content) {
    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: filename.endsWith('.txt') ? filename : `${filename}.txt`,
            types: [{ description: 'Textdatei', accept: { 'text/plain': ['.txt'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        return JSON.stringify({ status: "success", message: "Datei gespeichert." });
    } catch (err) {
        return JSON.stringify({ status: "error", message: err.message });
    }
}

// Tool zum Öffnen/Lesen
async function read_note() {
    try {
        // Öffnet den systemeigenen Android Dateimanager
        const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'Textdatei', accept: { 'text/plain': ['.txt'] } }],
            multiple: false
        });
        
        const file = await handle.getFile();
        const content = await file.text();
        
        return JSON.stringify({ 
            status: "success", 
            filename: file.name,
            content: content 
        });
    } catch (err) {
        return JSON.stringify({ status: "error", message: err.message });
    }
}

// Registrierung der Funktionen
window.agentTools = {
    save_note: save_note,
    read_note: read_note
};