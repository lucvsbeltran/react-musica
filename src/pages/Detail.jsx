import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Personaje no encontrado");
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando personaje...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!character) return <p>No hay datos para este personaje.</p>;

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver
      </Link>
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-full md:w-1/3 rounded"
        />
        <div className="flex-1">
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Estado:</strong> {character.status}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          <p><strong>Origen:</strong> {character.origin.name}</p>
          <p><strong>Ubicación:</strong> {character.location.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;

