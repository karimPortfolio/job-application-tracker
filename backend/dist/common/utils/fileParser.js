"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFileContent = parseFileContent;
const common_1 = require("@nestjs/common");
const pdf_parse_1 = require("pdf-parse");
const mammoth_1 = __importDefault(require("mammoth"));
async function parseFileContent(file) {
    if (!file) {
        throw new common_1.BadRequestException('No file provided');
    }
    let buffer;
    const mimeType = file.mimetype || 'application/pdf';
    if (file.buffer && Buffer.isBuffer(file.buffer)) {
        buffer = file.buffer;
    }
    else if (file.on && typeof file.on === 'function') {
        buffer = await streamToBuffer(file);
    }
    else {
        throw new common_1.BadRequestException('Invalid file format');
    }
    if (mimeType.startsWith('text/')) {
        console.log('Parsing text file');
        return buffer.toString('utf-8');
    }
    if (mimeType === 'application/pdf') {
        console.log('Parsing PDF file');
        const data = new pdf_parse_1.PDFParse({
            data: buffer,
        });
        return (await data.getText()).text;
    }
    const result = await mammoth_1.default.extractRawText({ buffer });
    console.log('Parsing DOCX file');
    return result.value;
}
async function streamToBuffer(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}
//# sourceMappingURL=fileParser.js.map