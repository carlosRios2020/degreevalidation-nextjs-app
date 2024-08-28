'use client';

import React, { useState } from 'react';
import { getProvider, getContract } from '../lib/contract';
import { CircularProgress, Box, Typography, TextField, Button } from '@mui/material';
import crypto from 'crypto';
import Swal from 'sweetalert2';

const DocumentVerification: React.FC = () => {
    const [documentId, setDocumentId] = useState<string>('');
    const [tituloHashStored, setTituloHashStored] = useState<string>('');
    const [actaGradoHashStored, setActaGradoHashStored] = useState<string>('');
    const [uploadedTituloHash, setUploadedTituloHash] = useState<string | null>(null);
    const [uploadedActaGradoHash, setUploadedActaGradoHash] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isTituloValid, setIsTituloValid] = useState<boolean | null>(null);
    const [isActaValid, setIsActaValid] = useState<boolean | null>(null);

    const fetchStoredHashes = async () => {
        if (!documentId) {
            Swal.fire('Error', 'Debe ingresar un documento de identidad válido', 'error');
            return;
        }

        setLoading(true);
        try {
            const provider = getProvider();
            await provider.send("eth_requestAccounts", []);
            const contract = await getContract(provider);

            // Obtener los hashes almacenados en la blockchain
            const { diplomaHash, gradeReportHash } = await contract.getDocumentHashes(documentId);
            setTituloHashStored(diplomaHash);
            setActaGradoHashStored(gradeReportHash);
        } catch (error) {
            console.error('Error fetching stored hashes:', error);
            Swal.fire('Error', 'Hubo un problema al obtener los hashes almacenados', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        setFileHash: React.Dispatch<React.SetStateAction<string | null>>,
        isTitulo: boolean
    ) => {
        const file = event.target.files?.[0] || null;
        try {
            if (!file) {
                Swal.fire('Error', 'No se seleccionó ningún archivo', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                const buffer = Buffer.from(reader.result as ArrayBuffer);
                const hash = crypto.createHash('sha256').update(buffer).digest('hex');
                setFileHash(hash);

                if (isTitulo) {
                    const isValid = hash === tituloHashStored;
                    setIsTituloValid(isValid);
                    if (isValid) {
                        Swal.fire('Éxito', 'El título es válido y coincide con el hash almacenado.', 'success');
                    } else {
                        Swal.fire('Error', 'El título no coincide con el hash almacenado.', 'error');
                    }
                } else {
                    const isValid = hash === actaGradoHashStored;
                    setIsActaValid(isValid);
                    if (isValid) {
                        Swal.fire('Éxito', 'El acta de grado es válida y coincide con el hash almacenado.', 'success');
                    } else {
                        Swal.fire('Error', 'El acta de grado no coincide con el hash almacenado.', 'error');
                    }
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error uploading file:', error);
            Swal.fire('Error', 'Hubo un problema al procesar el archivo', 'error');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
            <Typography variant="h4" gutterBottom>Verificación de Documentos</Typography>
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Documento de Identidad"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                onClick={fetchStoredHashes}
                disabled={loading || !documentId}
            >
                {loading ? <CircularProgress size={24} /> : 'Obtener Hashes Almacenados'}
            </Button>

            {tituloHashStored && actaGradoHashStored && (
                <>
                    <Typography variant="h6" gutterBottom>Hashes Almacenados</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Hash del Título"
                        value={tituloHashStored}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Hash del Acta de Grado"
                        value={actaGradoHashStored}
                        InputProps={{ readOnly: true }}
                    />
                </>
            )}

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Subir y Verificar Archivos</Typography>
            <div>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, setUploadedTituloHash, true)}
                />
                <Typography variant="body2" color={isTituloValid ? 'green' : 'red'}>
                    {isTituloValid !== null && (isTituloValid ? 'El Título es válido.' : 'El Título no es válido.')}
                </Typography>
            </div>
            <div style={{ marginTop: '20px' }}>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, setUploadedActaGradoHash, false)}
                />
                <Typography variant="body2" color={isActaValid ? 'green' : 'red'}>
                    {isActaValid !== null && (isActaValid ? 'El Acta de Grado es válida.' : 'El Acta de Grado no es válida.')}
                </Typography>
            </div>
        </Box>
    );
};

export default DocumentVerification;
