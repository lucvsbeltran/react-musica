import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(
          `https://theaudiodb.com/api/v1/json/2/search.php?s=${id}`
        );
        setArtist(res.data.artists ? res.data.artists[0] : null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtist();
  }, [id]);

  if (!artist) return <p className="p-4">Artista no encontrado.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{artist.strArtist}</h1>
      <img src={artist.strArtistThumb} alt={artist.strArtist} className="mb-2" />
      <p><strong>Género:</strong> {artist.strGenre}</p>
      <p><strong>Formación:</strong> {artist.intBornYear}</p>
      <p><strong>Biografía:</strong> {artist.strBiographyEN}</p>
    </div>
  );
}

export default Detail;
