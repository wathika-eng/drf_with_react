import React, { useEffect, useState } from 'react';
import Api from '../Api';
import { ACCESS_TOKEN } from '../constants';


const Home = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log(token);
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        Api.get("/api/notes/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                setNotes(res.data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Home</h1>
            <div>
                {notes.map(note => (
                    <div key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
