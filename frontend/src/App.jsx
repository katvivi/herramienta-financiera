import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [inventario, setInventario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    producto: '',
    cantidad: '',
    peso: '',
    precio: '',
    proveedor: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/inventario')
      .then(response => {
        setInventario(response.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/inventario', nuevoProducto)
      .then(response => {
        setInventario([...inventario, response.data]);
        setNuevoProducto({
          producto: '',
          cantidad: '',
          peso: '',
          precio: '',
          proveedor: ''
        });
        setShowModal(false);
      });
  };

  return (
    <div className="App">
      <h1>Inventario</h1>
      <button onClick={() => setShowModal(true)}>Agregar Producto</button>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Peso</th>
            <th>Precio</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item, index) => (
            <tr key={index}>
              <td>{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>{item.peso}</td>
              <td>{item.precio}</td>
              <td>{item.proveedor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>Producto:</label>
              <input type="text" name="producto" value={nuevoProducto.producto} onChange={handleChange} required />
              <label>Cantidad:</label>
              <input type="number" name="cantidad" value={nuevoProducto.cantidad} onChange={handleChange} required />
              <label>Peso:</label>
              <input type="text" name="peso" value={nuevoProducto.peso} onChange={handleChange} required />
              <label>Precio:</label>
              <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} required />
              <label>Proveedor:</label>
              <input type="text" name="proveedor" value={nuevoProducto.proveedor} onChange={handleChange} required />
              <button type="submit">Agregar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
