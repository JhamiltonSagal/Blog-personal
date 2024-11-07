import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/HeaderT';
import FooterT from './componentes/FooterT';
import Inicio from './componentes/Inicio'; 
import Entradablog from './componentes/Entradablog';
import ListablogsT from './componentes/ListablogsT'; 
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [comments, setComments] = useState({});
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    const savedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setEntries(savedEntries);
    setComments(savedComments);
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('entries', JSON.stringify(entries));
    }
    if (Object.keys(comments).length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [entries, comments]);

  const saveEntry = (entry) => {
    setEntries((prevEntries) => {
      const entryExists = prevEntries.some((e) => e.id === entry.id);
      if (entryExists) {
        return prevEntries.map((e) => (e.id === entry.id ? entry : e));
      } else {
        return [...prevEntries, { ...entry, id: Date.now() }];
      }
    });
    setEditingEntry(null);
  };

  const deleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    const updatedComments = { ...comments };
    delete updatedComments[id];
    setComments(updatedComments);
  };

  const addComment = (entryId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [entryId]: [...(prevComments[entryId] || []), comment],
    }));
  };

  const updateComment = (entryId, updatedComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [entryId]: prevComments[entryId].map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      ),
    }));
  };

  const deleteComment = (entryId, commentId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [entryId]: prevComments[entryId].filter((comment) => comment.id !== commentId),
    }));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/entradas"
            element={
              <ListablogsT 
                entries={entries} 
                editEntry={setEditingEntry} 
                deleteEntry={deleteEntry} 
                addComment={addComment} 
                updateComment={updateComment} 
                deleteComment={deleteComment} 
                comments={comments} 
              />
            }
          />
          <Route
            path="/crear"
            element={<Entradablog saveEntry={saveEntry} editingEntry={null} />}
          />
          <Route
            path="/editar/:id"
            element={<Entradablog saveEntry={saveEntry} editingEntry={editingEntry} />}
          />
        </Routes>
        <FooterT />
      </div>
    </Router>
  );
}

export default App;