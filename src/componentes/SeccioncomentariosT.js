import React, { useState, useEffect } from 'react';

function SeccioncomentariosT({ entryId, comments = {}, addComment, updateComment, deleteComment }) {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [localComments, setLocalComments] = useState(comments[entryId] || []);

  
  useEffect(() => {
    setLocalComments(comments[entryId] || []);
  }, [entryId, comments]);

  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const comment = { id: Date.now(), text: newComment };
      addComment(entryId, comment);
      setNewComment('');
    }
  };

  
  const startEditComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };


  const handleSaveEdit = () => {
    if (editingCommentId !== null && editingText.trim() !== '') {
      const updatedComment = { id: editingCommentId, text: editingText };
      updateComment(entryId, updatedComment);
      setEditingCommentId(null);
      setEditingText('');
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(entryId, commentId);
  };

  return (
    <div>
      <h3>Comentarios</h3>
      <ul>
        {localComments.map((comment) => (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Guardar</button>
                <button onClick={() => setEditingCommentId(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <p>{comment.text}</p>
                <button onClick={() => startEditComment(comment.id, comment.text)}>Editar</button>
                <button onClick={() => handleDeleteComment(comment.id)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <button type="submit">Agregar Comentario</button>
      </form>
    </div>
  );
}

export default SeccioncomentariosT;