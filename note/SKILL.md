---
name: NoteManager
description: Ein Tool zum Erstellen, Speichern und Lesen von Textnotizen.
version: 1.0
manifest: manifest.json
entry: logic.js
---

# NoteManager
Dieser Skill nutzt `manifest.json` zur Definition der Funktionen und `logic.js` für die Ausführung.

## Funktionen
- **save_note**: Nutzt die Filesystem-API, um Notizen als .txt-Dateien auf dem Gerät zu speichern.
- **read_note**: Nutzt die Filesystem-API, um existierende .txt-Dateien zu öffnen und auszulesen.

Der Agent ist angewiesen, für alle Dateioperationen die in `logic.js` definierten Funktionen zu verwenden.