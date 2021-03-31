import React from 'react';
import { CountdownCircle } from './components/CountdownCircle';
import Box from '@material-ui/core/Box'

const Timer = () => {
    return (
        <Box width="250px" m="auto">
            <CountdownCircle />
            <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                { 
                    // reset button 
                }
                <Box display="flex" flexDirection="column" alignItems="center" mx={3}>
                { 
                    // toggle button
                }
                </Box>
                { 
                    // skip button 
                }
            </Box>
            <Box display="flex" justifyContent="center">
                {
                    // rounds counter
                }
            </Box>
        </Box>
    );
}

export default Timer;