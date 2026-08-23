import pdfParse from 'pdf-parse';

/**
 * Clean PDF binary stream artifacts, metadata tags, and C2PA signature blocks
 * @param {string} text 
 * @returns {string}
 */
const cleanPdfText = (text = '') => {
  return text
    .replace(/endstream[\s\S]*?endobj/gi, '')
    .replace(/\/Filter\s*\[[\s\S]*?\]/gi, '')
    .replace(/c2pa[\s\S]*?application\/c2pa/gi, '')
    .replace(/[\w.-]+\s*D:\d{14}[+|-]\d{2}'\d{2}'/gi, '')
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Filter non-printable binary characters
    .replace(/\r\n/g, '\n')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

/**
 * Extracts text from PDF buffer with stream sanitization
 * @param {Buffer} buffer 
 * @returns {Promise<{ text: string, numPages: number, info: object }>}
 */
export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    const cleanedText = cleanPdfText(data.text || '');

    if (!cleanedText || cleanedText.length < 5) {
      throw new Error('No readable text found in PDF document.');
    }

    return {
      text: cleanedText,
      numPages: data.numpages || 1,
      info: data.info || {},
    };
  } catch (error) {
    console.error('PDF Parsing Error:', error);
    throw new Error(`Failed to parse PDF document: ${error.message || 'Corrupted or unreadable PDF'}`);
  }
};
