import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "@mui/material/Link";
import {MenuItem} from "@mui/material";

export default function ButtonAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <Toolbar sx={{borderBottom: 0.5}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Lassagårdsbergs Vägförening
                </Typography>
                <Button color="primary" variant="outlined">Logga in</Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                <MenuItem>
                    <Typography textAlign="center">
                        Aktuellt
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center">
                        För medlemmar
                    </Typography>
                </MenuItem><MenuItem>
                <Typography textAlign="center">
                    Annat
                </Typography>
            </MenuItem>
            </Toolbar>

        </Box>
    );
}
