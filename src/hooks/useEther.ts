'use client';
import { useState } from 'react';
import { getProvider, getContract } from '@/lib/contract';
import { ethers } from 'ethers';

export const useEther = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const connectWallet = async () => {
        try {
            const provider = getProvider();
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const account = await signer.getAddress();
            setAccount(account);
            setProvider(provider);
            setContract(await getContract(provider));
        } catch (error) {
            console.error("Error al conectar con la wallet:", error);
        }
    };

    const registerUser = async (
        name: string,
        documentType: number,
        documentId: string,
        email: string
    ) => {
        if (!contract) return;
        try {
            const tx = await contract.registerUser(name, documentType, documentId, email);
            await tx.wait();
            alert('Usuario registrado exitosamente');
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert('Error al registrar el usuario');
        }
    };

    return {
        connectWallet,
        registerUser,
        account,
    };
};
