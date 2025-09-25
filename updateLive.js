import fs from "fs";
import fetch from "node-fetch";

async function aggiornaLive() {
  const apiKey = "AIzaSyCFeCh0ZtRew3tJO8JfRuqR41YQDxEud2k";
  const channelId = "UCaJbcPGyEcpwHHArQhophWw";
  const tavoli = [];

  let pageToken = undefined; // inizia senza token
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", channelId);
    url.searchParams.set("eventType", "live");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const res = await fetch(url.toString());
    const data = await res.json();

    if (!data.items || data.items.length === 0) break;

    data.items.forEach((item) => {
      tavoli.push({
        nome: item.snippet.title,
        descrizione: item.snippet.description,
        codice: item.id.videoId
      });
    });

    pageToken = data.nextPageToken; // token della pagina successiva
  } while (pageToken);

  const json = { tavoli };
  fs.writeFileSync("streamingurls.json", JSON.stringify(json, null, 2));
  console.log("File streamingurls.json aggiornato!");
  console.log(json);
}

aggiornaLive().catch(console.error);
