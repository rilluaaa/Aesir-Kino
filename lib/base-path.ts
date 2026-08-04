const basePath = process.env.NODE_ENV === "production" ? "/Aesir-Kino" : "";

export function withBasePath(path: string) {
  return `${basePath}${path}`;
}
