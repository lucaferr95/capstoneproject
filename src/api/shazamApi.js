export const fetchTopSongsByArtist = async (artistName) => {
  const RAPID_API_KEY = "a22555931amshab02c3c1b6cef33p1a28a7jsn525dd46aa6c5";
  const headers = {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  };

  // FASE 1: Ottieni l’ID dell’artista
  const searchResponse = await fetch(
    `https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(
      artistName
    )}&locale=it-IT&limit=1`,
    { method: "GET", headers }
  );

  if (!searchResponse.ok) {
    console.error("Errore nella ricerca artista:", await searchResponse.text());
    throw new Error("Errore nella ricerca artista");
  }

  const searchData = await searchResponse.json();
  const artistId = searchData.artists?.hits?.[0]?.artist?.adamid;

  if (!artistId) {
    console.warn("ID artista non trovato per:", artistName);
    return [];
  }

  // FASE 2: Ottieni i brani top dell’artista
  const topTracksResponse = await fetch(
    `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${artistId}&locale=it-IT`,
    { method: "GET", headers }
  );

  if (!topTracksResponse.ok) {
    console.error("Errore nei top brani:", await topTracksResponse.text());
    throw new Error("Errore nei brani top");
  }

  const topTracksData = await topTracksResponse.json();
  return topTracksData.tracks || [];
};
