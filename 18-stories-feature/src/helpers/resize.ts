type ResizeOptions = {
  maxWidth: number;
  maxHeight: number;
  mimeType?: "image/jpeg" | "image/webp" | "image/png";
  quality?: number; // 0..1 (solo aplica a jpeg/webp)
};

export function resizeImageFileToDataURL(
  file: File,
  opts: ResizeOptions
): Promise<string> {
  const {
    maxWidth,
    maxHeight,
    mimeType = "image/jpeg",
    quality = 0.85,
  } = opts;

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        const scale = Math.min(maxWidth / w, maxHeight / h, 1);
        const targetW = Math.round(w * scale);
        const targetH = Math.round(h * scale);

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get 2D context");

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, targetW, targetH);

        const dataUrl = canvas.toDataURL(mimeType, quality);

        resolve(dataUrl);
      } catch (err) {
        reject(err);
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
