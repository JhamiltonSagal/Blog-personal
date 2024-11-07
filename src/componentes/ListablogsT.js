import React, { useState } from 'react';
import SeccioncomentariosT from './SeccioncomentariosT';
import './ListablogsT.css';
import { useNavigate } from 'react-router-dom';

function ListablogsT({ entries, editEntry, deleteEntry, comments, addComment, updateComment, deleteComment }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    acc[entry.category] = acc[entry.category] || [];
    acc[entry.category].push(entry);
    return acc;
  }, {});

  const filteredEntries = selectedCategory
    ? entries.filter((entry) => entry.category === selectedCategory)
    : entries;

  const handleEdit = (entry) => {
    editEntry(entry);
    navigate('/editar/${entry.id}');
  };

  return (
    <div>
      <h2>Lista de Blogs</h2>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Todas las categorías</option>
        {Object.keys(groupedEntries).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {filteredEntries.length === 0 ? (
        <p>No hay entradas en esta categoría.</p>
      ) : (
        <div className="blogs-container">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="blog-entry">
              {entry.image && <img src={entry.image} alt="Imagen del blog" style={{ maxWidth: '100%' }} />}
              <h4>{entry.title}</h4>
              <p>{entry.content}</p>
              <button onClick={() => handleEdit(entry)}>Editar</button>
              <button onClick={() => deleteEntry(entry.id)}>Eliminar</button>
              <SeccioncomentariosT
                entryId={entry.id}
                comments={comments}
                addComment={addComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListablogsT;