import { BadRequestException } from '@nestjs/common';
import pdf, { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import { Readable } from 'stream';

export async function parseFileContent(
  file: Express.Multer.File | NodeJS.ReadableStream,
): Promise<any> {
  if (!file) {
    throw new BadRequestException('No file provided');
  }

  // Convert stream to buffer if needed
  let buffer: Buffer;
  const mimeType = (file as any).mimetype || 'application/pdf';

  if ((file as any).buffer && Buffer.isBuffer((file as any).buffer)) {
    buffer = (file as any).buffer;
  } else if ((file as any).on && typeof (file as any).on === 'function') {
    // Stream case (S3)
    buffer = await streamToBuffer(file as NodeJS.ReadableStream);
  } else {
    throw new BadRequestException('Invalid file format');
  }

  if (mimeType.startsWith('text/')) {
    console.log('Parsing text file');
    return buffer.toString('utf-8');
  }

  if (mimeType === 'application/pdf') {
    console.log('Parsing PDF file');
    const data = new PDFParse({
      data: buffer,
    });
    return (await data.getText()).text;
  }

  const result = await mammoth.extractRawText({ buffer });
  console.log('Parsing DOCX file');
  return result.value;
}

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
