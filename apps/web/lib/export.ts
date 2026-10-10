// PNGs and data URIs can't inherit a text color, so `currentColor` becomes a concrete one.
export const withColor = (svg: string, color: string) =>
  svg.replaceAll("currentColor", color);

export function svgDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22")}`;
}

export function saveFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export async function svgToPng(svg: string, px: number): Promise<Blob> {
  const sized = svg.replace(
    /width="[^"]*" height="[^"]*"/,
    `width="${px}" height="${px}"`,
  );
  const img = new Image();
  img.src = svgDataUri(sized);
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = px;
  canvas.getContext("2d")!.drawImage(img, 0, 0, px, px);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("PNG export failed"))),
      "image/png",
    ),
  );
}
