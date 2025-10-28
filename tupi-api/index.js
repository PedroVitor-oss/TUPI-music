import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import YT from "youtube-node";
import cors from "cors";


var youTube = new YT();
/* IMPORTATNTE https://www.theaudiodb.com/free_music_api#base_url */


import express from 'express';;
const app = express();

youTube.setKey("AIzaSyBq-qZg2SJrD0VQvKyrHe2O9k8GX1xda3k");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define caminho absoluto da pasta de downloads:
const DOWNLOADS_DIR = path.join(__dirname, 'data', 'musicas');

var whitelist = ['http://localhost:3000',"http://localhost:5080"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors({
  origin: '*'
}));
// Garante que exista:
if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

app.get('/', (req, res) => {
    res.send('Servidor rodando. Use o endpoint /download para baixar músicas do Spotify.');
    console.log("GET - Home")
}
);
app.get("/search/:s", async (req, res) => {
    console.log("GET - Search")
    youTube.search(req.params.s, 2, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 2));
    res.json(result);
  }
});
});
app.get('/download', (req, res) => {
    console.log("GET - Download")

    // Quando for chamar o comando:
    const jobId = uuidv4();
    const outputTemplate = path.join(DOWNLOADS_DIR, `${jobId}.%(ext)s`);
    let spotifyUrl = "https://open.spotify.com/intl-pt/album/1fk3oZLClQ3QyC7jMSxnj0?highlight=spotify:track:3oILt6IDvzE9CosG97I3va"
    // Exemplo de comando:
    const cmd = `spotifydl ${spotifyUrl} --output "${outputTemplate}" --output-only`;

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o comando: ${error.message}`);
            return;
        }

        console.log(`Comando executado com sucesso: ${stdout}`);
        if (stderr) {
            console.error(`Saída de erro: ${stderr}`);
        }
    });

    res.send(`Download iniciado para a URL: ${spotifyUrl}. Verifique a pasta de downloads em breve.`);
});

app.listen(5080, () => { console.log("coisa aberta") });