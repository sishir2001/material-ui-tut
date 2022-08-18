import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green, blue, purple } from "@material-ui/core/colors";
import { DeleteOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
    cardHeader: {
        padding: theme.spacing(1),
    },
    test: {
        border: (note) => {
            const redColor = red[500],
                greenColor = green[500],
                purpleColor = purple[500],
                blueColor = blue[500];
            if (note.category === "work") {
                return `1px solid ${redColor}`;
            } else if (note.category === "todos") {
                return `1px solid ${greenColor}`;
            } else if (note.category === "reminders") {
                return `1px solid ${blueColor}`;
            }
            return `1px solid ${purpleColor}`;
        },
    },
    cardAvatar: {
        background: (note) => {
            if (note.category === "work") {
                return red[500];
            } else if (note.category === "todos") {
                return green[500];
            } else if (note.category === "reminders") {
                return blue[500];
            }
            return purple[500];
        },
    },
}));

export default function NoteCard({ note, handleDelete }) {
    const classes = useStyles(note);
    const deletePost = () => {
        // need to use fetch to delete the post
        handleDelete(note.id);
    };

    return (
        <Card elevation={1} className={classes.test}>
            <CardHeader
                avatar={
                    <Avatar className={classes.cardAvatar}>
                        {note.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={deletePost}
                        id={note.id}
                    >
                        <DeleteOutlined />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {note.details}
                </Typography>
            </CardContent>
        </Card>
    );
}
