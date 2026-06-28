---
name: NoteManager
description: Tool zum Speichern und Lesen von Notizen.
---

<script>
window.agentTools = {
    save_note: async (filename, content) => {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename.endsWith('.txt') ? filename : `${filename}.txt`,
                types: [{ description: 'Textdatei', accept: { 'text/plain': ['.txt'] } }],
            });
            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();
            return JSON.stringify({ status: "success", message: "Gespeichert" });
        } catch (e) { return JSON.stringify({ status: "error", message: e.message }); }
    },
    read_note: async () => {
        try {
            const [handle] = await window.showOpenFilePicker();
            const file = await handle.getFile();
            return JSON.stringify({ status: "success", content: await file.text() });
        } catch (e) { return JSON.stringify({ status: "error", message: e.message }); }
    }
};
</script>

# NoteManager
Dieser Skill ist bereit. Verwende `save_note(filename, content)` oder `read_note()`.

{
  "tools": [
    {
      "name": "save_note",
      "description": "Speichert eine Notiz. Parameter: filename (string), content (string).",
      "parameters": {
        "type": "object",
        "properties": {
          "filename": { "type": "string" },
          "content": { "type": "string" }
        },
        "required": ["filename", "content"]
      }
    },
    {
      "name": "read_note",
      "description": "Liest eine Datei.",
      "parameters": { "type": "object", "properties": {}, "required": [] }
    }
  ]
}