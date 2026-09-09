import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function DetalleAlquiler() {
  const { id } = useParams();

  const[alquiler, setAlquiler] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => { 
  fetch(`/api/alquileres/${id}`)
    .then(response => {
      if (!response.ok) {
        setAlquiler(null);
        return null;
      }
      return response.json();
    })
    .then(data => setAlquiler(data))
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => setCargando(false));
  }, [id]);

  return (
  <div>
    {cargando ? (
      <p>Cargando...</p>
    ) : alquiler ? (
      <div>
        <h1>{alquiler.titulo}</h1>
        <p>{alquiler.descripcion}</p>
        <p>Precio: {alquiler.moneda} {alquiler.precio}</p>
      </div>
    ) : (
      <p>No se encontró el alquiler con ID {id}</p>
    )}
  </div>
);
}

export default DetalleAlquiler