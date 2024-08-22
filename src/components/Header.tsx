"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { getProvider } from "../lib/contract";
import Swal from "sweetalert2";
import Menu from "./menu";

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const provider = getProvider();
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      Swal.fire("Conectado", "MetaMask conectado exitosamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con MetaMask", "error");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    Swal.fire("Desconectado", "MetaMask desconectado exitosamente", "success");
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 3)}...${walletAddress.slice(-3)}`
    : "";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a202c" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Menu />
          <h1 style={{ color: "white", marginLeft: "20px" }}>
            Validación de Títulos Profesionales
          </h1>
        </Box>
        <Box>
          {walletAddress ? (
            <>
              <span style={{ color: "white", marginRight: "10px" }}>
                {truncatedAddress}
              </span>
              <Button color="inherit" onClick={disconnectWallet}>
                Desconectar
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={connectWallet}>
              Conectar MetaMask
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
