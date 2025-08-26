import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState("");

  const searchArtist = async () => {
    try {
      const res = await axios.get(
        `https://theaudiodb.com/api/v1/json/2/search.php?s=${query}`
      );
      setArtists(res.data.artists || []);
    } catch (error) {
      console.error(error);
      setArtists([]);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Escribe el nombre del artista"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 rounded"
        />
        <button
          onClick={searchArtist}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <Link
            key={artist.idArtist}
            to={`/artist/${artist.strArtist}`}
            className="border p-2 rounded hover:shadow"
          >
            <img src={artist.strArtistThumb || "https://via.placeholder.com/150"} alt={artist.strArtist} />
            <h2 className="font-bold">{artist.strArtist}</h2>
            <p>{artist.strCountry}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
