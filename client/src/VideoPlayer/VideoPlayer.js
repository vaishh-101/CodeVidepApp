// VideoPlayer.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css';

function VideoPlayer() {
  const { videoID } = useParams();

  return (
    <div className="video-player-container">
      <div className="title-container">
        <h1 className="text-center">Video Player</h1>
      </div>
      <div className="video-container">
        <iframe
          className="yt-iframe"
          src={`https://www.youtube.com/embed/${videoID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="notepad-container">
        <Notepad />
      </div>
    </div>
  );
}

function Notepad() {
  const [notes, setNotes] = useState('');
  const [editing, setEditing] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const localStorageKey = 'notes';

  useEffect(() => {
    const storedNotes = localStorage.getItem(localStorageKey);
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleNoteChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
  };

  const handleAddClick = () => {
    setEditing(true);
    setIsNewNote(true);
    setNotes('');
  };

  const handleEditClick = () => {
    setEditing(true);
    setIsNewNote(false);
  };

  const handleSaveClick = () => {
    if (isNewNote) {
      const updatedNotes = `${notes}\n\n`;
      localStorage.setItem(localStorageKey, updatedNotes);
      setNotes(updatedNotes);
    } else {
      localStorage.setItem(localStorageKey, notes);
    }
    setEditing(false);
  };

  const handleDeleteClick = () => {
    localStorage.removeItem(localStorageKey);
    setNotes('');
    setEditing(false);
  };

  return (
    <div className="notepad">
      <h2 className="text-center">Notepad</h2>
      {editing ? (
        <>
          <textarea
            className="form-control"
            value={notes}
            onChange={handleNoteChange}
            placeholder="Write your notes here..."
          ></textarea>
          <div className="text-center mt-3">
            <button className="btn btn-primary mx-2" onClick={handleSaveClick}>
              Save
            </button>
            <button className="btn btn-danger mx-2" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="form-control-static">{notes}</p>
          <div className="text-center mt-2">
            <button className="btn btn-info" onClick={handleAddClick}>
              Add
            </button>
            <button className="btn btn-info mx-2" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
