"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { getProvider, getContract } from '../lib/contract';
import Swal from 'sweetalert2';
import { uploadFile } from '@/utils/uploadFiles';
import crypto from 'crypto';

const DocumentUploadForm: React.FC = () => {
    const { handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            universityName: '',
        },
    });

    const [tituloPdf, setTituloPdf] = useState<string | null>(null);
    const [actaGradoPdf, setActaGradoPdf] = useState<string | null>(null);
    const [tituloHash, setTituloHash] = useState<string>('');
    const [actaGradoHash, setActaGradoHash] = useState<string>('');
    const [loading, setIsLoading] = useState(false);

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        setFileUrl: React.Dispatch<React.SetStateAction<string | null>>,
        setFileHash: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const file = event.target.files?.[0] || null;
        if (!file) {
            console.error('No se seleccionó ningún archivo.');
            return;
        }

        setIsLoading(true);
        try {
            // Leer el archivo y generar el hash
            const reader = new FileReader();
            reader.onloadend = async () => {
                const buffer = Buffer.from(reader.result as ArrayBuffer);
                const hash = crypto.createHash('sha256').update(buffer).digest('hex');
                setFileHash(hash);

                // Subir el archivo utilizando la función uploadFile
                const uploadedDocumentUrl = await uploadFile(file);
                setFileUrl(uploadedDocumentUrl);

                Swal.fire('¡Archivo cargado exitosamente!', uploadedDocumentUrl);
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            Swal.fire('Hubo un error al subir el archivo. Inténtalo de nuevo.');
            console.error('Error durante la carga del archivo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        if (!tituloHash || !actaGradoHash || !tituloPdf || !actaGradoPdf) {
            Swal.fire('Error', 'Debe subir ambos documentos para proceder.', 'error');
            return;
        }

        try {
            const provider = getProvider();
            await provider.send("eth_requestAccounts", []);
            const contract = await getContract(provider);
            console.log("documentos subidos","titulohash:", tituloHash, "||", "acta hash:", actaGradoHash, "universidad:", data.universityName  );
            const tx = await contract.uploadDocuments(tituloHash, actaGradoHash, data.universityName);
            await tx.wait();
            reset();
            Swal.fire('Éxito', 'Documentos subidos exitosamente', 'success');
        } catch (error) {
            reset();
            console.error('Error subiendo los documentos:', error);
            Swal.fire('Error', 'Hubo un problema al subir los documentos', 'error');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
                margin: 'auto',
                mt: 5,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Subir Documentos</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, setTituloPdf, setTituloHash)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    />
                    <p>{tituloPdf ? `Archivo subido: ${tituloPdf}` : 'Subir Título (PDF)'}</p>
                </div>
                <div>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, setActaGradoPdf, setActaGradoHash)}
                        style={{ display: 'block', marginBottom: '20px' }}
                    />
                    <p>{actaGradoPdf ? `Archivo subido: ${actaGradoPdf}` : 'Subir Acta de Grado (PDF)'}</p>
                </div>
                <Controller
                    name="universityName"
                    control={control}
                    rules={{ required: 'Nombre de la Universidad es obligatorio' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Nombre de la Universidad"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#0B7DEF',
                        '&:hover': {
                            backgroundColor: '#0056b3',
                        },
                        '&:disabled': {
                            backgroundColor: '#5D6064',
                        },
                        padding: '10px 20px',
                        fontSize: '16px',
                        textTransform: 'none',
                    }}
                    disabled={isSubmitting || loading}
                >
                    {isSubmitting || loading ? <CircularProgress size={24} /> : 'Subir Documentos'}
                </Button>
            </form>
        </Box>
    );
};

export default DocumentUploadForm;
