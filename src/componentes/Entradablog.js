import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Entradablog({ saveEntry, editingEntry }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(''); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setContent(editingEntry.content);
      setCategory(editingEntry.category);
      setImage(editingEntry.image || ''); 
      setIsEditing(true);
    } else {
      setTitle('');
      setContent('');
      setCategory('');
      setImage('');
      setIsEditing(false);
    }
  }, [editingEntry]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: isEditing ? editingEntry.id : Date.now(),
      title,
      content,
      category,
      image,
    };
    saveEntry(newEntry);
    navigate('/entradas');
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Entrada' : 'Crear Entrada'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Contenido:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <label>Categoría:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <label>Imagen:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Vista previa" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        <button type="submit">{isEditing ? 'Actualizar' : 'Guardar'} Entrada</button>
      </form>
    </div>
  );
}

export default Entradablog;