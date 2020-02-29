import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, TextField, Button, Box, makeStyles, Container } from '@material-ui/core';
import io from 'socket.io-client';
import './App.css';

const useStyles = makeStyles(theme => ({
    textWelcome: {
        margin: theme.spacing(8),
    },
}))

class Welcome extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            name: '',
        }
    }

    onChange = (event) =>
    {
        this.setState({
            name: event.target.value,
        })
    }

    onSubmit = () =>
    {
        var name = this.state.name;
        if (name == '') {
            name = 'I forgot to put a name.';
        };
        this.props.socket.emit('message', {
            type: "NEW_USER",
            content: name
        });
    }

    render()
    {
        // const classes = useStyles();
        return (
            <Box my="auto"><Grid container direction="column" alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item><Box component="h3" m={1}>Cards Against Humanity</Box></Grid>
                <Grid item><Box mx="auto" m={1}><TextField variant="outlined" name="inpName" id="inpName" label="Please enter a name" onChange={this.onChange} ></TextField></Box></Grid>
                <Grid item><Button variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button></Grid>
            </Grid></Box>
        );
    }
}

export default Welcome;