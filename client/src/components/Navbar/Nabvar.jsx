import React, { useState } from "react"
import { AppBar, Box, Link, Button, Toolbar, Typography, IconButton, Menu, MenuItem, } from '@mui/material'

const links = ['Home', 'Products', 'Cart']

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)

    const handleNavMenu = (e) => {
        setAnchorElNav(e.currentTarget)
    }

    const handleCloseNav = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar position="static" color='default'>
            <Box mx={6} display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6'>Logo</Typography>
                {links.map((link, index) => (
                    <Toolbar key={link}>
                        <Link href='#' key={link} cursor='pointer' underline='hover'>
                            {link}
                        </Link>
                    </Toolbar>
                ))}
                <Button variant='text'>Login</Button>
                <Button variant='outlined'>Sign Up</Button>
            </Box>
        </AppBar>
    )
}

export default Navbar