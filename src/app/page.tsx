"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '@/assets/css/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(1);

  const navigateToRegister = () => {
    router.push('/registro');
  };

  const sections = [
    {
      title: 'Validación de Títulos Profesionales con Blockchain',
      description:
        'Protege y verifica la autenticidad de títulos académicos utilizando la tecnología más avanzada de la blockchain.',
      buttonText: 'Regístrate Ahora',
    },
    {
      title: '¿Cómo Funciona?',
      description:
        'Nuestro sistema utiliza contratos inteligentes en la blockchain para garantizar la integridad y la autenticidad de los títulos académicos.',
      buttonText: 'Comienza Ahora',
    },
    {
      title: 'Seguro y Confiable',
      description:
        'Cada documento es verificado por entidades autorizadas y su hash es registrado en la blockchain, asegurando que los títulos no puedan ser falsificados ni manipulados.',
      buttonText: 'Verifica tu Título',
    },
  ];

  // Movimiento automático del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev === sections.length ? 1 : prev + 1));
    }, 5000); // Cambia de sección cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src="https://titulos-universitarios.s3.amazonaws.com/blockchain3.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className={styles.heading}>{sections[activeSection - 1].title}</h1>
          <p className={styles.description}>{sections[activeSection - 1].description}</p>
          <button className={styles.primaryButton} onClick={navigateToRegister}>
            {sections[activeSection - 1].buttonText}
          </button>
        </motion.div>

        <div className={styles.buttons}>
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index + 1)}
              className={activeSection === index + 1 ? `${styles.active}` : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
