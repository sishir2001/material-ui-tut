import { React, useState } from "react";
import {
    Typography,
    Button,
    Container,
    makeStyles,
    TextField,
    Box,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio,
    FormControl,
} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: "block",
    },
});

export default function Create() {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [details, setDetail] = useState("");
    const [detailError, setDetailError] = useState(false);
    const [category, setCategory] = useState("todos");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailError(false);
        if (title === "") {
            setTitleError(true);
        }
        if (details === "") {
            setDetailError(true);
        } else {
            const formObj = {
                title,
                details,
                category,
            };
            fetch("http://localhost:3001/notes", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formObj),
            })
                .then(() => {
                    history.push("/");
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const handleCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    };

    return (
        <Container>
            <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create a new note
            </Typography>

            <Box mt={4}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className={classes.field}
                        label="Title"
                        variant="outlined"
                        id="title"
                        fullWidth
                        required
                        error={titleError}
                    />
                    <TextField
                        onChange={(e) => {
                            setDetail(e.target.value);
                        }}
                        className={classes.field}
                        multiline
                        minRows={4}
                        label="Detail"
                        variant="outlined"
                        id="details"
                        fullWidth
                        required
                        error={detailError}
                    />
                    <FormControl className={classes.field}>
                        <FormLabel component="legend">Category</FormLabel>
                        <RadioGroup
                            name="category"
                            value={category}
                            onChange={handleCategory}
                        >
                            <FormControlLabel
                                value="remainder"
                                control={<Radio />}
                                label="Remainder"
                            />
                            <FormControlLabel
                                value="work"
                                control={<Radio />}
                                label="Work"
                            />
                            <FormControlLabel
                                value="todos"
                                control={<Radio />}
                                label="Todos"
                            />
                            <FormControlLabel
                                value="money"
                                control={<Radio />}
                                label="Money"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        endIcon={<ArrowForwardIosRoundedIcon />}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
