import React from 'react'
import CSS from 'csstype';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Disable() {
  return (
      <div style={divStyle}>
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
     
    </Box>
    </div>
  )
}

const divStyle : CSS.Properties = {
    position : 'fixed',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)'

}



export default Disable
