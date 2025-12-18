// Polyfill for File global to fix undici compatibility in Electron
// This must be loaded before any other modules that might use undici

if (typeof globalThis.File === 'undefined') {
  // @ts-ignore - File might not be available in Node.js types
  globalThis.File = class File extends Blob {
    public name: string;
    public lastModified: number;

    constructor(bits: BlobPart[], name: string, options?: FilePropertyBag) {
      super(bits, options);
      this.name = name;
      this.lastModified = options?.lastModified || Date.now();
    }
  };
}

// Also polyfill FileReader if needed
if (typeof globalThis.FileReader === 'undefined') {
  // @ts-ignore
  globalThis.FileReader = class FileReader {
    // Minimal implementation - undici mainly checks for existence
  };
}
