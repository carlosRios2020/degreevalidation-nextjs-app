import { uploadFileToS3 } from '@/lib/actions/s3.actions';

interface UploadUrlResponse {
  url?: string;
  error?: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const requestBody = await request.json();
    const { fileName, fileContent, contentType } = requestBody;

    if (!fileName || !fileContent || !contentType) {
      const errorResponse: UploadUrlResponse = {
        error: 'fileName, fileContent y contentType son requeridos.',
      };
      return new Response(JSON.stringify(errorResponse), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
    if (!bucketName) {
      throw new Error('El nombre del bucket no está configurado.');
    }

    // Convertir el contenido del archivo de base64 a un buffer
    const buffer = Buffer.from(fileContent, 'base64');

    // Subir el archivo a S3
    const result = await uploadFileToS3(bucketName, fileName, buffer, contentType);

    // Obtener la URL del archivo subido
    const uploadedUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

    // Devolver la URL de la imagen subida
    return new Response(
      JSON.stringify({ url: uploadedUrl }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error subiendo archivo a S3:', error);
    const errorResponse: UploadUrlResponse = {
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido subiendo archivo a S3.',
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
