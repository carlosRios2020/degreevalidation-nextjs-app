"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { getProvider } from "../lib/contract";
import Swal from "sweetalert2";
import Menu from "./menu";
import { motion } from "framer-motion";

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
          <motion.h1
            style={{ color: "white", marginLeft: "30px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { yoyo: Infinity },
            }}
          >
            CertiChain
          </motion.h1>
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
