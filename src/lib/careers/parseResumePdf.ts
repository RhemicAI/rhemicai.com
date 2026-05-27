import { PDFParse } from "pdf-parse";

const MAX_RESUME_TEXT_CHARS = 20_000;

export async function parseResumePdfText(resumeBuffer: Buffer) {
  const parser = new PDFParse({ data: new Uint8Array(resumeBuffer) });
  try {
    const parsed = await parser.getText();
    return parsed.text.replace(/\s+/g, " ").trim().slice(0, MAX_RESUME_TEXT_CHARS);
  } finally {
    await parser.destroy();
  }
}
