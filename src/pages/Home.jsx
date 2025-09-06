import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");

  const searchCharacter = async () => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
      const data = await res.json();
      setCharacters(data.results || []);
    } catch (error) {
      console.error(error);
      setCharacters([]);
    }
  };

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => setCharacters(data.results));
  }, []);

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
          onClick={searchCharacter}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {characters.map((char) => (
          <Link
            key={char.id}
            to={`/artist/${char.id}`}
            className="border p-2 rounded hover:shadow"
          >
            <img src={char.image} alt={char.name} />
            <h2 className="font-bold">{char.name}</h2>
            <p>{char.species}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

