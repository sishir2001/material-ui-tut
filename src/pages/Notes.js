import { Container, Typography, Box, Grid, Paper } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
    const [notes, setNotes] = useState([]);

    const getList = async () => {
        const res = await fetch("http://localhost:3001/notes");
        const res_json = await res.json();
        setNotes(res_json);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch("http://localhost:3001/notes/" + id, {
                method: "DELETE",
            });
            if (res.status === 200) {
                // successfully deleted
                // ! deleting locally
                const updatedNotes = notes.filter((note) => {
                    return note.id !== id;
                });
                setNotes(updatedNotes);
            } else {
                // put up error message
            }
        } catch (e) {
            console.log(e);
            // put up error message
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    };
    return (
        <Container>
            <div>
                <Masonry
                    className="my-masonry-grid"
                    breakpointCols={breakpoints}
                    columnClassName="my-masonry-grid_column"
                >
                    {notes.map((note) => (
                        <div item xs={12} md={6} lg={4} key={note.id}>
                            <NoteCard note={note} handleDelete={handleDelete} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </Container>
    );
}
