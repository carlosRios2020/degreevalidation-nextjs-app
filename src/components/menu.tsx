'use client';

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '@/assets/css/menu.css';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuItems = [
    { name: 'Inicio', link: '/' },
    { name: 'Subir Documentos', link: '/subir-documentos' },
    { name: 'Verificar Autenticidad', link: '/verificar-documentos' },
    { name: 'Registro', link: '/registro' },
  ];

  return (
    <div className="vertical-menu-container">
      <motion.button
        onClick={toggleMenu}
        className="menu-toggle-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ☰
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="vertical-menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Nav className="flex-column">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.link}
                  href={item.link}
                  label={item.name}
                  onClick={toggleMenu}
                />
              ))}
            </Nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => (
  <Nav.Item className="navItem">
    <Link href={href} className="navLink" onClick={onClick}>
      {label}
    </Link>
  </Nav.Item>
);

export default Menu;
