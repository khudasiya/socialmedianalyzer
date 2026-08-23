import pdfParse from 'pdf-parse';

/**
 * Extracts text from PDF buffer
 * @param {Buffer} buffer 
 * @returns {Promise<{ text: string, numPages: number, info: object }>}
 */
export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    const cleanedText = (data.text || '')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

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
