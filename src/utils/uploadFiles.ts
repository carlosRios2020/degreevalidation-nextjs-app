// utils/uploadFile.ts
export const uploadFile = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const contentType = file.type;
  
    const reader = new FileReader();
  
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const fileContent = reader.result?.toString().split(',')[1]; // Convertir el archivo a base64 y extraer la parte de contenido
  
          if (!fileContent) {
            throw new Error('Error al leer el archivo');
          }
          const response = await fetch('/api/upload-docs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fileName,
              fileContent,
              contentType,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error al subir el archivo');
          }
          const data = await response.json();
          resolve(data.url); // Devuelve la URL de la imagen subida
        } catch (error) {
          reject(error);
        }
      };
  
      reader.onerror = () => {
        reject(new Error('Error leyendo el archivo'));
      };
  
      reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    });
  };
  