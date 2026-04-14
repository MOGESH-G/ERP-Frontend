function getTenant() {
  const host = window.location.hostname;

  const parts = host.split(".");

  return parts[0];
}

export function getApiBaseUrl() {
  const tenant = getTenant();
  const protocol = window.location.protocol;

  const port = import.meta.env.VITE_API_PORT;
  const domain = import.meta.env.VITE_API_BASE_DOMAIN;

  if (!tenant) {
    return `${protocol}//${domain}:${port}/api`;
  }

  return `${protocol}//${tenant}.${domain}:${port}/api`;
}
