import React from 'react';
import { Box } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                textAlign: 'center',
                backgroundColor: '#1a202c',
                color: 'white',
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}
        >
            © {new Date().getFullYear()} Ing Carlos Rios. Todos los derechos reservados.
        </Box>
    );
};

export default Footer;
