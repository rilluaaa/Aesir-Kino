function normalizeBasePath(value?: string): string {
  const path = (value ?? "").trim();

  if (!path || path === "/") {
    return "";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;

  return withLeadingSlash.replace(/\/+$/, "");
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const externalUrlPattern = /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i;

export function withBasePath(path: string): string {
  if (!basePath || !path || externalUrlPattern.test(path)) {
    return path;
  }

  const localPath = path.startsWith("/") ? path : `/${path}`;

  if (localPath === basePath || localPath.startsWith(`${basePath}/`)) {
    return localPath;
  }

  return `${basePath}${localPath}`;
}
