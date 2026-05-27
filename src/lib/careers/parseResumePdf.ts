const MAX_RESUME_TEXT_CHARS = 20_000;
type PdfParseModule = typeof import("pdf-parse");
type PdfGlobal = Record<"DOMMatrix" | "ImageData" | "Path2D", unknown>;

let pdfParseModule: Promise<PdfParseModule> | null = null;

async function installCanvasPolyfills() {
  const pdfGlobal = globalThis as unknown as Partial<PdfGlobal>;
  if (pdfGlobal.DOMMatrix && pdfGlobal.ImageData && pdfGlobal.Path2D) return;

  const canvas = await import("@napi-rs/canvas");
  pdfGlobal.DOMMatrix ??= canvas.DOMMatrix;
  pdfGlobal.ImageData ??= canvas.ImageData;
  pdfGlobal.Path2D ??= canvas.Path2D;
}

async function loadPdfParse() {
  await installCanvasPolyfills();
  pdfParseModule ??= import("pdf-parse");
  return pdfParseModule;
}

export async function parseResumePdfText(resumeBuffer: Buffer) {
  const { PDFParse } = await loadPdfParse();
  const parser = new PDFParse({ data: new Uint8Array(resumeBuffer) });
  try {
    const parsed = await parser.getText();
    return parsed.text.replace(/\s+/g, " ").trim().slice(0, MAX_RESUME_TEXT_CHARS);
  } finally {
    await parser.destroy();
  }
}
