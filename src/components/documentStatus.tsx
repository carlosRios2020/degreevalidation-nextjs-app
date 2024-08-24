'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import { getProvider, getContract } from '../lib/contract';
import Swal from 'sweetalert2';

const DocumentStatus: React.FC = () => {
    const [studentDocumentId, setStudentDocumentId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [documentStatus, setDocumentStatus] = useState<any | null>(null);

    const fetchDocumentStatus = async () => {
        if (!studentDocumentId) {
            Swal.fire('Error', 'Debes ingresar un Documento de Identidad válido.', 'error');
            return;
        }

        setLoading(true);
        try {
            const provider = getProvider();
            await provider.send("eth_requestAccounts", []);
            const contract = await getContract(provider);

            const status = await contract.getDocumentStatus(studentDocumentId);

            setDocumentStatus({
                studentName: status[0],
                universityName: status[1],
                isValidatedByTeacher: status[2],
                isValidatedByUniversity: status[3],
                isSentToBlockchain: status[4],
                uploadTimestamp: new Date(parseInt(status[5]) * 1000).toLocaleString(),
                validationTimestamp: status[2] && status[3] ? new Date(parseInt(status[6]) * 1000).toLocaleString() : 'N/A',
                blockchainTimestamp: status[4] ? new Date(parseInt(status[7]) * 1000).toLocaleString() : 'N/A',
            });
        } catch (error) {
            console.error('Error fetching document status:', error);
            Swal.fire('Error', 'Hubo un problema al obtener el estado del documento', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: 'auto',
                mt: 5,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Verificar Estado del Documento
            </Typography>
            <TextField
                label="Documento de Identidad del Estudiante"
                fullWidth
                margin="normal"
                value={studentDocumentId}
                onChange={(e) => setStudentDocumentId(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={fetchDocumentStatus}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Verificar Estado'}
            </Button>

            {documentStatus && (
                <Box mt={4}>
                    <Typography variant="h6">Resultados:</Typography>
                    <Typography><strong>Nombre del Estudiante:</strong> {documentStatus.studentName}</Typography>
                    <Typography><strong>Universidad:</strong> {documentStatus.universityName}</Typography>
                    <Typography><strong>Validado por Maestro:</strong> {documentStatus.isValidatedByTeacher ? 'Sí' : 'No'}</Typography>
                    <Typography><strong>Validado por Universidad:</strong> {documentStatus.isValidatedByUniversity ? 'Sí' : 'No'}</Typography>
                    <Typography><strong>Enviado a Blockchain:</strong> {documentStatus.isSentToBlockchain ? 'Sí' : 'No'}</Typography>
                    <Typography><strong>Fecha de Subida:</strong> {documentStatus.uploadTimestamp}</Typography>
                    <Typography><strong>Fecha de Validación:</strong> {documentStatus.validationTimestamp}</Typography>
                    <Typography><strong>Fecha en Blockchain:</strong> {documentStatus.blockchainTimestamp}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default DocumentStatus;
