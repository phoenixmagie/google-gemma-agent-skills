window.agentTools = {
    save_note: async function(filename, content) {
        try {
            if (!window.showSaveFilePicker) {
                return JSON.stringify({ status: "error", message: "Dateisystem-API nicht verfügbar." });
            }
            // Dateinamen sicherstellen
            const safeName = filename.endsWith('.txt') ? filename : `${filename}.txt`;
            
            const handle = await window.showSaveFilePicker({
                suggestedName: safeName,
                types: [{ description: 'Textdatei', accept: { 'text/plain': ['.txt'] } }],
            });
            
            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();
            
            return JSON.stringify({ status: "success", message: `Datei '${safeName}' wurde gespeichert.` });
        } catch (err) {
            return JSON.stringify({ status: "error", message: err.message });
        }
    },

    read_note: async function() {
        try {
            if (!window.showOpenFilePicker) {
                return JSON.stringify({ status: "error", message: "Dateisystem-API nicht verfügbar." });
            }
            
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
};
