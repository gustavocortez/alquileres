import { Routes, Route } from 'react-router-dom'
import ListadoAlquileres from './pages/ListadoAlquileres'
import DetalleAlquiler from './pages/DetalleAlquiler'

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<ListadoAlquileres />} />
      <Route path="/alquileres/:id" element={<DetalleAlquiler />} />
    </Routes>
  )
}

export default App