import fs from "fs";
import fetch from "node-fetch";

async function aggiornaLive() {
  const apiKey = "AIzaSyCFeCh0ZtRew3tJO8JfRuqR41YQDxEud2k";
  const channelId = "Paxy_86";

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  const tavoli = data.items.map((item, index) => ({
    nome: `Tavolo ${index + 1} - ${item.snippet.title}`,
    codice: item.id.videoId
  }));

  const json = { tavoli };
  fs.writeFileSync("streamingurls.json", JSON.stringify(json, null, 2));
  console.log("File streamingurls.json aggiornato!");
}

aggiornaLive().catch(console.error);
