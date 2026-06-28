/**
 * Logik für den Note-Manager Skill
 */

async function save_note(filename, content) {
    console.log(`Versuche Notiz zu speichern: ${filename}`);

    // Sicherstellen, dass der Dateiname auf .txt endet
    const safeFilename = filename.endsWith('.txt') ? filename : `${filename}.txt`;

    try {
        // Prüfen, ob die File System Access API verfügbar ist
        if ('showSaveFilePicker' in window) {
            const handle = await window.showSaveFilePicker({
                suggestedName: safeFilename,
                types: [{
                    description: 'Textdatei',
                    accept: { 'text/plain': ['.txt'] },
                }],
            });

            // Datei beschreibbar machen
            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();

            return JSON.stringify({
                status: "success",
                message: `Die Datei '${safeFilename}' wurde erfolgreich gespeichert.`
            });
        } else {
            // Fallback: Wenn die API nicht direkt unterstützt wird
            // Hier könnte man einen Blob-Download erzwingen
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = safeFilename;
            a.click();
            URL.revokeObjectURL(url);

            return JSON.stringify({
                status: "success",
                message: "Datei-Download wurde im Browser initiiert."
            });
        }
    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        return JSON.stringify({
            status: "error",
            message: `Fehler beim Speichern von '${safeFilename}': ${err.message}`
        });
    }
}

// Registrierung für den Agenten
// Dies stellt sicher, dass die App die Funktion 'save_note' erkennt
window.agentTools = {
    save_note: save_note
};