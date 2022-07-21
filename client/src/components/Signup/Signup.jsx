import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
    
    }

    return (
        <Card>
            <CardContent>
                <Typography variant='h5'>
                    Sign Up
                </Typography>
                <TextField id='name' label='Name' value={name} onChange={(e) => { setName(e.target.value) }} margin='normal' />
                <TextField id='' label='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} margin='normal' />
                <TextField id='' label='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} margin='normal' />
            </CardContent>
            <CardActions>
                <Button color='primary' variant='contained' onClick={handleSubmit}>Submit</Button>
            </CardActions>
        </Card>
    )
}

export default SignUp