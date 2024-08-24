"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

  return (
    <div className="container">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="video-background"
      >
        <source src="https://titulos-universitarios.s3.amazonaws.com/blockchain3.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>

      {/* Contenedor de textos superpuestos */}
      <div className="content">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>{sections[activeSection - 1].title}</h1>
          <p>{sections[activeSection - 1].description}</p>
          <button onClick={navigateToRegister}>
            {sections[activeSection - 1].buttonText}
          </button>
        </motion.div>

        <div className="buttons">
          <button
            onClick={() => setActiveSection(1)}
            className={activeSection === 1 ? 'active' : ''}
          >
            1
          </button>
          <button
            onClick={() => setActiveSection(2)}
            className={activeSection === 2 ? 'active' : ''}
          >
            2
          </button>
          <button
            onClick={() => setActiveSection(3)}
            className={activeSection === 3 ? 'active' : ''}
          >
            3
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 50px;
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          color: white;
          text-align: left;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        button {
          background-color: #007bff;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
        }

        .buttons {
          margin-top: 1.5rem;
        }

        .buttons button {
          margin-right: 10px;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: transparent;
          color: white;
          border: 2px solid white;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .buttons button.active,
        .buttons button:hover {
          background-color: white;
          color: black;
        }
      `}</style>
    </div>
  );
}
