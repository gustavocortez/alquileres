import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListadoAlquileres() {

  const [alquileres, setAlquileres] = useState([]);
  useEffect(() => {
    fetch('/api/alquileres')
      .then(response => response.json())
      .then(data => setAlquileres(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Listado de Alquileres</h1>
      <ul>
        {alquileres.map(alquiler => (
          <li key={alquiler.id} className="border rounded-lg p-4 shadow hover:shadow-md flex flex-col gap-2">
            <Link to={`/alquileres/${alquiler.id}`}>{alquiler.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default ListadoAlquileres