import React from 'react'
import '../css/Loader.css'
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

function Loader() {
    return (
        <div className="loader">
            <CircularProgress className="loader__icon"  />
        </div>
    )
}

export default Loader
