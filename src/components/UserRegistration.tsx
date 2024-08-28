'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, CircularProgress } from '@mui/material';
import { getProvider, getContract } from '../lib/contract';
import Swal from 'sweetalert2';

// Mapeo de los valores de enum a sus correspondientes valores numéricos en Solidity
const documentTypeEnum: { [key: string]: number } = {
    CC: 0,
    PASSPORT: 1,
    TE: 2
};

const UserRegistration: React.FC = () => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            documentId: '',
            documentType: 'CC',
            email: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const provider = getProvider();
            await provider.send("eth_requestAccounts", []); // Solicita la conexión de MetaMask
            const contract = await getContract(provider); // Se usa await aquí

            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();

            // Verificar si el usuario ya está registrado
            const userInfo = await contract.users(userAddress);
            if (userInfo.isRegistered) {
                // Si el usuario ya está registrado, mostrar un mensaje de alerta
                Swal.fire({
                    title: 'Ya estás registrado',
                    text: `Lo sentimos, pero ya estás registrado con esta billetera como ${userInfo.name}.`,
                    icon: 'error',
                });
                return;
            }

            // Convertir el tipo de documento al valor numérico esperado por el contrato
            const documentTypeNumeric = documentTypeEnum[data.documentType as keyof typeof documentTypeEnum];

            const tx = await contract.registerUser(data.name, documentTypeNumeric, data.documentId, data.email);
            await tx.wait(); // Espera a que la transacción sea minada

            Swal.fire('Éxito', 'Usuario registrado exitosamente', 'success');
        } catch (error) {
            console.error('Error registrando el usuario:', error);
            Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: 'auto',
                mt: 5,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro de Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Nombre es obligatorio' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Nombre"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name="documentId"
                    control={control}
                    rules={{ required: 'Documento de Identidad es obligatorio' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Documento de Identidad"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name="documentType"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            label="Tipo de Documento"
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                            <MenuItem value="PASSPORT">Pasaporte</MenuItem>
                            <MenuItem value="TE">Tarjeta de Identidad</MenuItem>
                        </TextField>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Correo Electrónico es obligatorio' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Correo Electrónico"
                            type="email"
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
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Registrar Usuario'}
                </Button>
            </form>
        </Box>
    );
};

export default UserRegistration;
