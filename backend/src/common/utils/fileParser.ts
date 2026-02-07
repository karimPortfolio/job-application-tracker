import { BadRequestException } from '@nestjs/common';
import pdf, { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseFileContent(
  file: Express.Multer.File,
): Promise<any> {
  if (!file) {
    throw new BadRequestException('No file provided');
  }

  if (file.mimetype.startsWith('text/')) {
    console.log('Parsing text file');
    return file.buffer.toString('utf-8');
  }

  if (file.mimetype === 'application/pdf') {
    console.log('Parsing PDF file');
    const data = new PDFParse({
        data: file.buffer,
    });
    return (await data.getText()).text;
  }

  const result = await mammoth.extractRawText({ buffer: file.buffer });
  console.log('Parsing DOCX file');
  return result.value;
}
